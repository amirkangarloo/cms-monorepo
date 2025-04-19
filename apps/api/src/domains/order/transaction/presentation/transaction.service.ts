import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaymentGateway } from '@prisma/client';
import { CreateTransactionCommand } from 'apps/api/src/domains/order/transaction/application/commands/create-transaction.command';
import { UpdateTransactionCommand } from 'apps/api/src/domains/order/transaction/application/commands/update-transaction.command';
import {
  CreateTransactionRequestDto,
  TransactionIdRequestDto,
} from 'apps/api/src/domains/order/transaction/application/dto';
import { GetTransactionQuery } from 'apps/api/src/domains/order/transaction/application/queries/get-transaction.query';
import { IPaymentGateway } from 'apps/api/src/domains/order/transaction/domain/interface';
import { StripePaymentService } from 'apps/api/src/domains/order/transaction/infrastructure/adapter';

@Injectable()
export class TransactionService {
  private paymentGateway: Record<PaymentGateway, IPaymentGateway>;

  constructor(
    private readonly stripePaymentService: StripePaymentService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
    this.paymentGateway = {
      STRIPE: this.stripePaymentService,
    };
  }

  async pay(payload: CreateTransactionRequestDto) {
    const transaction = await this.commandBus.execute(
      new CreateTransactionCommand(
        payload.amount,
        payload.paymentGateway,
        payload.orderId
      )
    );

    const paymentGateway = await this.paymentGateway[
      payload.paymentGateway
    ].pay({
      amount: payload.amount,
      redirectUrl: `${process.env.REDIRECT_URL}/${transaction.id}`,
    });

    return paymentGateway;
  }

  async verify(payload: TransactionIdRequestDto) {
    const transaction = await this.queryBus.execute(
      new GetTransactionQuery(payload.transactionId)
    );

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    const paymentGateway = await this.paymentGateway[
      transaction.paymentGateway
    ].verify({
      transactionId: transaction.id,
    });

    await this.commandBus.execute(
      new UpdateTransactionCommand(transaction.id, paymentGateway.status)
    );

    return {
      status: paymentGateway.status,
      transactionId: transaction.id,
    };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTransactionCommand } from 'apps/api/src/domains/order/transaction/application/commands/create-transaction.command';
import { CreateTransactionRequestDto } from 'apps/api/src/domains/order/transaction/application/dto';

@Injectable()
export class TransactionService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly _queryBus: QueryBus
  ) {}

  async create(payload: CreateTransactionRequestDto) {
    return this.commandBus.execute(
      new CreateTransactionCommand(
        payload.amount,
        payload.paymentGateway,
        payload.orderId
      )
    );
  }
}

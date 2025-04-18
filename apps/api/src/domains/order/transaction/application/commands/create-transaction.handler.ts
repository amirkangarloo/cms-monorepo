import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from './create-transaction.command';
import { TransactionRepository } from 'apps/api/src/domains/order/transaction/infrastructure/transaction.repository';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler
  implements ICommandHandler<CreateTransactionCommand>
{
  constructor(private readonly repository: TransactionRepository) {}

  async execute(command: CreateTransactionCommand) {
    return this.repository.create({
      amount: command.amount,
      paymentGateway: command.paymentGateway,
      orderId: command.orderId,
    });
  }
}

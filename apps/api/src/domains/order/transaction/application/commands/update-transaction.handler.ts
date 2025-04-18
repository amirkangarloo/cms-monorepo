import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTransactionCommand } from './update-transaction.command';
import { TransactionRepository } from 'apps/api/src/domains/order/transaction/infrastructure/transaction.repository';

@CommandHandler(UpdateTransactionCommand)
export class UpdateTransactionHandler
  implements ICommandHandler<UpdateTransactionCommand>
{
  constructor(private readonly repository: TransactionRepository) {}

  async execute(command: UpdateTransactionCommand): Promise<void> {
    await this.repository.update(command.transactionId, {
      status: command.status,
    });
  }
}

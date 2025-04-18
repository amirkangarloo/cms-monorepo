import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTransactionQuery } from './get-transaction.query';
import { TransactionRepository } from 'apps/api/src/domains/order/transaction/infrastructure/transaction.repository';
import { Transaction } from 'apps/api/src/domains/order/transaction/domain/transaction.entity';

@QueryHandler(GetTransactionQuery)
export class GetTransactionHandler
  implements IQueryHandler<GetTransactionQuery>
{
  constructor(private readonly repository: TransactionRepository) {}

  async execute(query: GetTransactionQuery): Promise<Transaction | null> {
    return this.repository.findById(query.transactionId);
  }
}

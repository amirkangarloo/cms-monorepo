import { TransactionStatus } from '@prisma/client';

export class UpdateTransactionCommand {
  constructor(
    public readonly transactionId: string,
    public readonly status: TransactionStatus
  ) {}
}

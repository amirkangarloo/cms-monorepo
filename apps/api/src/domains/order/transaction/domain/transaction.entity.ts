import { PaymentGateway, TransactionStatus } from '@prisma/client';

export class Transaction {
  constructor(
    public readonly id: string,
    public amount: number,
    public status: TransactionStatus = TransactionStatus.PENDING,
    public paymentGateway: PaymentGateway,
    public orderId: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}

import { PaymentGateway } from '@prisma/client';

export class CreateTransactionCommand {
  constructor(
    public readonly amount: number,
    public readonly paymentGateway: PaymentGateway,
    public readonly orderId: string
  ) {}
}

import { OrderStatus } from '@prisma/client';

export class Customer {
  constructor(
    public readonly id: string,
    public amount: number,
    public status: OrderStatus,
    public transactions: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}

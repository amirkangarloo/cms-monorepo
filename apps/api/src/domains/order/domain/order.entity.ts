import { OrderStatus } from '@prisma/client';

export class Order {
  constructor(
    public readonly id: string,
    public amount: number,
    public status: OrderStatus,
    public customerId: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}

import { OrderStatus } from '@prisma/client';

export class UpdateOrderCommand {
  constructor(
    public readonly id: string,
    public readonly amount?: number,
    public readonly status?: OrderStatus
  ) {}
}

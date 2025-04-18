import { Injectable } from '@nestjs/common';
import { DbService } from 'apps/api/src/db/db.service';
import { Order as PrismaOrder } from '@prisma/client';
import { Order } from 'apps/api/src/domains/order/domain/order.entity';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: DbService) {}

  async findAll(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany();
    return orders.map((o) => this.mapToEntity(o));
  }

  async findById(id: string): Promise<Order | null> {
    const o = await this.prisma.order.findUnique({ where: { id } });
    return o ? this.mapToEntity(o) : null;
  }

  async create(order: Partial<Order>): Promise<Order> {
    const c = await this.prisma.order.create({
      data: {
        amount: order.amount,
        customer: {
          connect: { id: order.customerId },
        },
      },
    });
    return this.mapToEntity(c);
  }

  async update(id: string, order: Partial<Order>): Promise<Order> {
    const c = await this.prisma.order.update({
      where: { id },
      data: order,
    });
    return this.mapToEntity(c);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({ where: { id } });
  }

  private mapToEntity(order: PrismaOrder): Order {
    return new Order(
      order.id,
      Number(order.amount),
      order.status,
      order.customerId,
      order.createdAt,
      order.updatedAt
    );
  }
}

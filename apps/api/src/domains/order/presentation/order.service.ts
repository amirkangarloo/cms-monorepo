import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from 'apps/api/src/domains/order/application/commands/create-order.command';
import { DeleteOrderCommand } from 'apps/api/src/domains/order/application/commands/delete-order.command';
import { UpdateOrderCommand } from 'apps/api/src/domains/order/application/commands/update-order.command';
import {
  CreateOrderRequestDto,
  OrderIdRequestDto,
  UpdateOrderRequestDto,
} from 'apps/api/src/domains/order/application/dto';
import { GetOrderByIdQuery } from 'apps/api/src/domains/order/application/queries/get-order-by-id.query';
import { GetOrderQuery } from 'apps/api/src/domains/order/application/queries/get-order.query';

@Injectable()
export class OrderService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async getAll() {
    return this.queryBus.execute(new GetOrderQuery());
  }

  async create(payload: CreateOrderRequestDto) {
    return this.commandBus.execute(
      new CreateOrderCommand(payload.amount, payload.customerId)
    );
  }

  async getById(payload: OrderIdRequestDto) {
    const order = await this.queryBus.execute(
      new GetOrderByIdQuery(payload.orderId)
    );
    if (!order) {
      throw new NotFoundException(`Order with id ${payload.orderId} not found`);
    }

    return order;
  }

  async update(payload: UpdateOrderRequestDto & OrderIdRequestDto) {
    await this.checkOrderExists(payload.orderId);

    return this.commandBus.execute(
      new UpdateOrderCommand(
        payload.orderId,
        payload.amount,
        payload.status
      )
    );
  }

  async delete(payload: OrderIdRequestDto) {
    await this.checkOrderExists(payload.orderId);

    await this.commandBus.execute(
      new DeleteOrderCommand(payload.orderId)
    );

    return { message: 'Order deleted' };
  }

  private async checkOrderExists(orderId: string): Promise<void> {
    const order = await this.queryBus.execute(new GetOrderByIdQuery(orderId));
    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }
  }
}

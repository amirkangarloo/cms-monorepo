import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderQuery } from 'apps/api/src/domains/order/application/queries/get-order.query';
import { Order } from 'apps/api/src/domains/order/domain/order.entity';
import { OrderRepository } from 'apps/api/src/domains/order/infrastructure/order.repository';

@QueryHandler(GetOrderQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrderQuery> {
  constructor(private readonly repository: OrderRepository) {}

  async execute(): Promise<Order[]> {
    return this.repository.findAll();
  }
}

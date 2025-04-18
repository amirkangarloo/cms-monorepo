import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderQuery } from 'apps/api/src/domains/order/application/queries/get-order.query';
import { OrderRepository } from 'apps/api/src/domains/order/infrastructure/order.repository';

@QueryHandler(GetOrderQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrderQuery> {
  constructor(private readonly repository: OrderRepository) {}

  async execute(): Promise<any> {
    return this.repository.findAll();
  }
}

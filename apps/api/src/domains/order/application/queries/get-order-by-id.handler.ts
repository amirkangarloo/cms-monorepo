import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderByIdQuery } from 'apps/api/src/domains/order/application/queries/get-order-by-id.query';
import { OrderRepository } from 'apps/api/src/domains/order/infrastructure/order.repository';

@QueryHandler(GetOrderByIdQuery)
export class GetOrderByIdHandler implements IQueryHandler<GetOrderByIdQuery> {
  constructor(private readonly repository: OrderRepository) {}

  async execute(query: GetOrderByIdQuery) {
    return this.repository.findById(query.id);
  }
}

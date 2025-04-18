import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomerByIdQuery } from './get-customer-by-id.query';
import { CustomerRepository } from 'apps/api/src/domains/customer/infrastructure/customer.repository';

@QueryHandler(GetCustomerByIdQuery)
export class GetCustomerByIdHandler implements IQueryHandler<GetCustomerByIdQuery> {
    constructor(private readonly repository: CustomerRepository) { }

    async execute(query: GetCustomerByIdQuery) {
        return this.repository.findById(query.id);
    }
}

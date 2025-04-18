import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomersQuery } from './get-customers.query';
import { CustomerRepository } from 'apps/api/src/domains/customer/infrastructure/customer.repository';

@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler implements IQueryHandler<GetCustomersQuery> {
    constructor(private readonly repository: CustomerRepository) { }

    async execute(): Promise<any> {
        return this.repository.findAll();
    }
}

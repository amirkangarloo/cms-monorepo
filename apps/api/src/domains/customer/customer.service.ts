import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCustomerCommand } from 'apps/api/src/domains/customer/application/commands/create-customer.command';
import { CreateCustomerRequestDto } from 'apps/api/src/domains/customer/application/dto';
import { GetCustomersQuery } from 'apps/api/src/domains/customer/application/queries/get-customers.query';

@Injectable()
export class CustomerService {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    async getAll() {
        return this.queryBus.execute(new GetCustomersQuery());
    }

    async create(payload: CreateCustomerRequestDto) {
        return this.commandBus.execute(
            new CreateCustomerCommand(payload.name, payload.email, payload.address),
        );
    }

    // add GET/:id, PUT/:id, DELETE/:id similarly
}

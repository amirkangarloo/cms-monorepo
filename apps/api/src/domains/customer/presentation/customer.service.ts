import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCustomerCommand } from 'apps/api/src/domains/customer/application/commands/create-customer.command';
import { DeleteCustomerCommand } from 'apps/api/src/domains/customer/application/commands/delete-customer.command';
import { UpdateCustomerCommand } from 'apps/api/src/domains/customer/application/commands/update-customer.command';
import {
  CreateCustomerRequestDto,
  CustomerIdRequestDto,
  UpdateCustomerRequestDto,
} from 'apps/api/src/domains/customer/application/dto';
import { GetCustomerByIdQuery } from 'apps/api/src/domains/customer/application/queries/get-customer-by-id.query';
import { GetCustomersQuery } from 'apps/api/src/domains/customer/application/queries/get-customers.query';

@Injectable()
export class CustomerService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async getAll() {
    return this.queryBus.execute(new GetCustomersQuery());
  }

  async create(payload: CreateCustomerRequestDto) {
    return this.commandBus.execute(
      new CreateCustomerCommand(payload.name, payload.email, payload.address)
    );
  }

  async getById(payload: CustomerIdRequestDto) {
    const customer = await this.queryBus.execute(
      new GetCustomerByIdQuery(payload.customerId)
    );
    if (!customer) {
      throw new NotFoundException(
        `Customer with id ${payload.customerId} not found`
      );
    }

    return customer;
  }

  async update(payload: UpdateCustomerRequestDto & CustomerIdRequestDto) {
    await this.checkCustomerExists(payload.customerId);

    return this.commandBus.execute(
      new UpdateCustomerCommand(
        payload.customerId,
        payload.name,
        payload.email,
        payload.address
      )
    );
  }

  async delete(payload: CustomerIdRequestDto) {
    await this.checkCustomerExists(payload.customerId);

    await this.commandBus.execute(
      new DeleteCustomerCommand(payload.customerId)
    );

    return { message: 'Customer deleted' };
  }

  private async checkCustomerExists(customerId: string): Promise<void> {
    const customer = await this.queryBus.execute(
      new GetCustomerByIdQuery(customerId)
    );
    if (!customer) {
      throw new NotFoundException(`Customer with id ${customerId} not found`);
    }
  }
}

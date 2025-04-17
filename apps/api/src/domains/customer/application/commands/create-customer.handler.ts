import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCustomerCommand } from './create-customer.command';
import { CustomerRepository } from 'apps/api/src/domains/customer/infrastructure/customer.repository';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<CreateCustomerCommand> {
    constructor(private readonly repository: CustomerRepository) { }

    async execute(command: CreateCustomerCommand) {
        return this.repository.create({
            name: command.name,
            email: command.email,
            address: command.address,
        });
    }
}

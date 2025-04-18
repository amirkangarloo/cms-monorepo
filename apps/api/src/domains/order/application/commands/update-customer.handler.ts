import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCustomerCommand } from './update-customer.command';
import { CustomerRepository } from 'apps/api/src/domains/customer/infrastructure/customer.repository';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler implements ICommandHandler<UpdateCustomerCommand> {
    constructor(private readonly repository: CustomerRepository) { }

    async execute(command: UpdateCustomerCommand) {
        return this.repository.update(command.id, {
            name: command.name,
            email: command.email,
            address: command.address,
        });
    }
}

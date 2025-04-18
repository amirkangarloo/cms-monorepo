import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCustomerCommand } from './delete-customer.command';
import { CustomerRepository } from 'apps/api/src/domains/customer/infrastructure/customer.repository';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler implements ICommandHandler<DeleteCustomerCommand> {
    constructor(private readonly repository: CustomerRepository) { }

    async execute(command: DeleteCustomerCommand): Promise<void> {
        await this.repository.delete(command.id);
    }
}

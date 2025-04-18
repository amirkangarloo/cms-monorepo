import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteOrderCommand } from 'apps/api/src/domains/order/application/commands/delete-order.command';
import { OrderRepository } from 'apps/api/src/domains/order/infrastructure/order.repository';

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderHandler implements ICommandHandler<DeleteOrderCommand> {
  constructor(private readonly repository: OrderRepository) {}

  async execute(command: DeleteOrderCommand): Promise<void> {
    await this.repository.delete(command.id);
  }
}

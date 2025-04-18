import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrderCommand } from 'apps/api/src/domains/order/application/commands/update-order.command';
import { OrderRepository } from 'apps/api/src/domains/order/infrastructure/order.repository';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
  constructor(private readonly repository: OrderRepository) {}

  async execute(command: UpdateOrderCommand) {
    return this.repository.update(command.id, {
      amount: command.amount,
      status: command.status,
    });
  }
}

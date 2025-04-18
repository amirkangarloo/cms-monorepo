import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from 'apps/api/src/domains/order/application/commands/create-order.command';
import { OrderRepository } from 'apps/api/src/domains/order/infrastructure/order.repository';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(private readonly repository: OrderRepository) {}

  async execute(command: CreateOrderCommand) {
    return this.repository.create({
      amount: command.amount,
      customerId: command.customerId,
    });
  }
}

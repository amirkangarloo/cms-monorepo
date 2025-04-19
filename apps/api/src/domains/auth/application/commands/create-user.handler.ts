import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from 'apps/api/src/domains/auth/application/commands/create-user.command';
import { UserRepository } from 'apps/api/src/domains/auth/infrastructure/user.repository';

@CommandHandler(CreateUserCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(private readonly repository: UserRepository) {}

  async execute(command: CreateUserCommand) {
    return this.repository.create({
      name: command.name,
      email: command.email,
      password: command.password,
    });
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from 'apps/api/src/domains/auth/application/queries/get-user-by-email.query';
import { UserRepository } from 'apps/api/src/domains/auth/infrastructure/user.repository';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler implements IQueryHandler<GetUserByEmailQuery> {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: GetUserByEmailQuery) {
    return this.repository.findByEmail(query.email);
  }
}

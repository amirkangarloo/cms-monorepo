import { Module, Provider } from '@nestjs/common';
import * as commandHandler from 'apps/api/src/domains/auth/application/queries';
import { UserRepository } from 'apps/api/src/domains/auth/infrastructure/user.repository';
import { AuthController } from 'apps/api/src/domains/auth/presentation/auth.controller';
import { AuthService } from 'apps/api/src/domains/auth/presentation/auth.service';

const commandHandlers: Provider[] = Object.values(commandHandler);

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, ...commandHandlers],
  exports: [],
})
export class AuthModule {}

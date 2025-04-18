import { Module, Provider } from '@nestjs/common';
import * as queryHandler from 'apps/api/src/domains/order/transaction/application/queries';
import * as commandHandler from 'apps/api/src/domains/order/transaction/application/commands';
import { TransactionController } from 'apps/api/src/domains/order/transaction/presentation/transaction.controller';
import { TransactionRepository } from 'apps/api/src/domains/order/transaction/infrastructure/transaction.repository';
import { TransactionService } from 'apps/api/src/domains/order/transaction/presentation/transaction.service';

const queryHandlers: Provider[] = Object.values(queryHandler);
const commandHandlers: Provider[] = Object.values(commandHandler);

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    TransactionRepository,
    ...commandHandlers,
    ...queryHandlers,
  ],
  exports: [],
})
export class TransactionModule {}

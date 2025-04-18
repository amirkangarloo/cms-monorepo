import { Module, Provider } from '@nestjs/common';
import * as queryHandler from 'apps/api/src/domains/order/application/queries';
import * as commandHandler from 'apps/api/src/domains/order/application/commands';
import { OrderController } from 'apps/api/src/domains/order/presentation/order.controller';
import { OrderService } from 'apps/api/src/domains/order/presentation/order.service';
import { TransactionModule } from 'apps/api/src/domains/order/transaction/transaction.module';
import { OrderRepository } from 'apps/api/src/domains/order/infrastructure/order.repository';

const queryHandlers: Provider[] = Object.values(queryHandler);
const commandHandlers: Provider[] = Object.values(commandHandler);

@Module({
  imports: [TransactionModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    ...commandHandlers,
    ...queryHandlers,
  ],
  exports: [],
})
export class OrderModule {}

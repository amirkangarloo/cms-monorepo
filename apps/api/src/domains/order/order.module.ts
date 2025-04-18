import { Module, Provider } from '@nestjs/common';
import * as queryHandler from 'apps/api/src/domains/order/application/queries';
import * as commandHandler from 'apps/api/src/domains/order/application/commands';
import { CustomerController } from 'apps/api/src/domains/order/presentation/order.controller';
import { CustomerService } from 'apps/api/src/domains/order/presentation/order.service';
import { CustomerRepository } from 'apps/api/src/domains/order/infrastructure/customer.repository';

const queryHandlers: Provider[] = Object.values(queryHandler);
const commandHandlers: Provider[] = Object.values(commandHandler);

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    CustomerRepository,
    ...commandHandlers,
    ...queryHandlers,
  ],
  exports: [],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import { OrderModule } from 'apps/api/src/domains/order/order.module';
import { CustomerModule } from 'apps/api/src/domains/customer/customer.module';

@Module({
  imports: [CustomerModule, OrderModule],
})
export class DomainsModule {}

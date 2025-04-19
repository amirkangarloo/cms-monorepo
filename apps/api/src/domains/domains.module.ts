import { Module } from '@nestjs/common';
import { AuthModule } from 'apps/api/src/domains/auth/auth.module';
import { OrderModule } from 'apps/api/src/domains/order/order.module';
import { CustomerModule } from 'apps/api/src/domains/customer/customer.module';

@Module({
  imports: [AuthModule, CustomerModule, OrderModule],
})
export class DomainsModule {}

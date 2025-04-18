import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DbModule } from 'apps/api/src/db/db.module';
import { DomainsModule } from 'apps/api/src/domains/domains.module';
import { HealthCheckController } from 'apps/api/src/health-check.controller';

@Module({
  imports: [CqrsModule.forRoot(), DbModule, DomainsModule],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}

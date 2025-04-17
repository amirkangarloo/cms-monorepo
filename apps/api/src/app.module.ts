import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DbModule } from 'apps/api/src/db/db.module';
import { DomainsModule } from 'apps/api/src/domains/domains.module';

@Module({
  imports: [CqrsModule.forRoot(), DbModule, DomainsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
import { Module } from '@nestjs/common';
import { DbModule } from 'apps/api/src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
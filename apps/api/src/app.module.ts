import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from 'apps/api/src/db/db.module';
import { DomainsModule } from 'apps/api/src/domains/domains.module';
import { HealthCheckController } from 'apps/api/src/health-check.controller';
import { jwtConstants } from 'apps/api/src/utils/constant';
import { AuthGuard } from 'apps/api/src/utils/guard';
import { LoggingInterceptor } from 'apps/api/src/utils/interceptor/logging.interceptor';

@Module({
  imports: [
    CqrsModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || jwtConstants.defaultExpiresIn,
      },
    }),
    DbModule,
    DomainsModule,
  ],
  controllers: [HealthCheckController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}

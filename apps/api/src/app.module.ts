import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from 'apps/api/src/db/db.module';
import { DomainsModule } from 'apps/api/src/domains/domains.module';
import { HealthCheckController } from 'apps/api/src/health-check.controller';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@cms-monorepo/share';
import { AuthGuard } from '@cms-monorepo/share';
import { LoggingInterceptor } from '@cms-monorepo/share';

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
      useFactory() {
        const reflector = new Reflector();
        const jwtService = new JwtService();
        const jwtSecret = process.env.JWT_SECRET;

        return new AuthGuard(jwtSecret, jwtService, reflector);
      },
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}

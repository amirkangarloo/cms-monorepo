import { Controller, Get, Logger, OnModuleInit } from '@nestjs/common';

@Controller({ path: 'health-check', version: '1' })
export class HealthCheckController implements OnModuleInit {
  private StartTime: Date;

  onModuleInit() {
    this.StartTime = new Date();
    Logger.log(
      'HealthCheckController initialized at',
      this.StartTime.toISOString()
    );
  }

  @Get()
  healthCheck() {
    return {
      status: 'live',
      uptime: this.getUptime(),
      startTime: this.StartTime,
    };
  }

  private getUptime(): string {
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}

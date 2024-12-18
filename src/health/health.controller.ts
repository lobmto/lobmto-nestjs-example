import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async getStatus(): Promise<{ status: string }> {
    const status = await this.healthService.getStatus();
    return { status };
  }
}

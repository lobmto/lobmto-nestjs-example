import { Injectable } from '@nestjs/common';
import { HealthRepository } from './health.repository';

@Injectable()
export class HealthService {
  constructor(private healthRepository: HealthRepository) {}

  async getStatus(): Promise<string> {
    return this.healthRepository.getStatus();
  }
}

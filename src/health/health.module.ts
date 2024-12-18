import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './health-status.entity';
import { HealthController } from './health.controller';
import { HealthRepository } from './health.repository';
import { HealthService } from './health.service';

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  controllers: [HealthController],
  providers: [HealthService, HealthRepository],
})
export class HealthModule {}

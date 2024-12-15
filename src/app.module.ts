import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthRepository } from './health.repository';
import { Status } from './health-status.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'main',
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Status]),
  ],
  controllers: [HealthController],
  providers: [HealthService, HealthRepository],
})
export class AppModule {}

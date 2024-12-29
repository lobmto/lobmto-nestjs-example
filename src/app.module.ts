import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module';
import { LoggerModule } from './logger/logger.module';
import { TagsModule } from './tags/tags.module';
import { WordsModule } from './words/words.module';

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
    LoggerModule,
    HealthModule,
    TagsModule,
    WordsModule,
  ],
})
export class AppModule {}

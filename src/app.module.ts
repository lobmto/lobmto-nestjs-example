import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleMiddleware } from './examples/example.middleware';
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
export class AppModule implements NestModule {
  // main.ts でも設定可能だが、 DI を利用しつつクラスで middleware を設定するために利用
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ExampleMiddleware).forRoutes('*');
  }
}

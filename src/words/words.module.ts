import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordEntity } from './word.entity';
import { WordsController } from './words.controller';
import { WordsRepository } from './words.repository';
import { WordsService } from './words.service';

@Module({
  imports: [TypeOrmModule.forFeature([WordEntity])],
  controllers: [WordsController],
  providers: [WordsRepository, WordsService],
})
export class WordsModule {}

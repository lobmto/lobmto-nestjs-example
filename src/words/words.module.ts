import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from 'src/tags/tags.module';
import { WordEntity } from './word.entity';
import { WordsController } from './words.controller';
import { WordsRepository } from './words.repository';
import { WordsService } from './words.service';

@Module({
  imports: [TypeOrmModule.forFeature([WordEntity]), TagsModule],
  controllers: [WordsController],
  providers: [WordsRepository, WordsService],
})
export class WordsModule {}

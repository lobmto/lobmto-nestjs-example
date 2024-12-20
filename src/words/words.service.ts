import { Injectable } from '@nestjs/common';
import { Word } from './word.entity';
import { WordsRepository } from './words.repository';

@Injectable()
export class WordsService {
  constructor(private wordsRepository: WordsRepository) {}

  async findWords(): Promise<Word[]> {
    return this.wordsRepository.findWords();
  }
}

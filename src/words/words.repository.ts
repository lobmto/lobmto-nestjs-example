import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './word.entity';

@Injectable()
export class WordsRepository {
  constructor(
    @InjectRepository(Word)
    private wordsRepository: Repository<Word>,
  ) {}

  async findWords(): Promise<Word[]> {
    return await this.wordsRepository.find();
  }

  async registerWord(word: Word): Promise<Word> {
    return await this.wordsRepository.save(word);
  }

  async findById(id: string): Promise<Word | null> {
    return await this.wordsRepository.findOne({ where: { id } });
  }

  async updateWord(
    id: string,
    data: { word?: string; meaning?: string },
  ): Promise<void> {
    if (Object.keys(data).length === 0) return;
    await this.wordsRepository.update(id, data);
  }

  async deleteWord(id: string): Promise<boolean> {
    const result = await this.wordsRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}

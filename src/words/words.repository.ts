import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordEntity } from './word.entity';

@Injectable()
export class WordsRepository {
  constructor(
    @InjectRepository(WordEntity)
    private wordsRepository: Repository<WordEntity>,
  ) {}

  async findWords(): Promise<WordEntity[]> {
    return await this.wordsRepository.find();
  }

  async registerWord(word: WordEntity): Promise<WordEntity> {
    return await this.wordsRepository.save(word);
  }

  async findById(id: string): Promise<WordEntity | null> {
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

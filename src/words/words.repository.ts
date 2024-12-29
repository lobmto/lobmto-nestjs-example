import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './word.domain';
import { WordEntity } from './word.entity';

@Injectable()
export class WordsRepository {
  constructor(
    @InjectRepository(WordEntity)
    private wordsRepository: Repository<WordEntity>,
  ) {}

  private toEntity(word: Word): WordEntity {
    const entity = new WordEntity();
    entity.id = word.id;
    entity.word = word.word;
    entity.meaning = word.meaning;
    return entity;
  }

  async findWords(): Promise<Word[]> {
    const wordEntities = await this.wordsRepository.find();
    return wordEntities.map((word) =>
      Word.reconstruct(word.id, word.word, word.meaning),
    );
  }

  async registerWord(word: Word): Promise<Word> {
    const entity = this.toEntity(word);

    const saved = await this.wordsRepository.save(entity);
    return Word.reconstruct(saved.id, saved.word, saved.meaning);
  }

  async findById(id: string): Promise<Word | null> {
    const entity = await this.wordsRepository.findOne({ where: { id } });

    if (!entity) return null;
    return Word.reconstruct(entity.id, entity.word, entity.meaning);
  }

  async updateWord(word: Word): Promise<void> {
    const entity = this.toEntity(word);
    await this.wordsRepository.save(entity);
  }

  async deleteWord(id: string): Promise<boolean> {
    const result = await this.wordsRepository.delete(id);

    const isDeleted = (result.affected ?? 0) > 0;
    return isDeleted;
  }
}

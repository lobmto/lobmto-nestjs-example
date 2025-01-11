import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './word.domain';
import { WordEntity, WordTagIdEntity } from './word.entity';

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
    entity.wordTagIdList = word.tagIdList.map((tagId) => {
      const wordTagIdEntity = new WordTagIdEntity();
      wordTagIdEntity.tagId = tagId;
      return wordTagIdEntity;
    });
    return entity;
  }

  /**
   * 単語のリストを取得する
   * タグIDのリストには削除済みが含まれる可能性がある。
   * @returns 単語のリスト
   */
  async findWords(): Promise<Word[]> {
    const wordEntities = await this.wordsRepository.find({
      relations: { wordTagIdList: true },
    });
    return wordEntities.map((word) =>
      Word.reconstruct(
        word.id,
        word.word,
        word.meaning,
        word.wordTagIdList.map(({ tagId }) => tagId),
      ),
    );
  }

  async registerWord(word: Word): Promise<Word> {
    const entity = this.toEntity(word);

    const saved = await this.wordsRepository.save(entity);
    return Word.reconstruct(
      saved.id,
      saved.word,
      saved.meaning,
      saved.wordTagIdList.map(({ tagId }) => tagId),
    );
  }

  /**
   * 単語を取得する
   * タグIDのリストには削除済みが含まれる可能性がある。
   * @param id 単語ID
   * @returns 単語
   */
  async findById(id: string): Promise<Word | null> {
    const entity = await this.wordsRepository.findOne({
      where: { id },
      relations: { wordTagIdList: true },
    });

    if (!entity) return null;
    return Word.reconstruct(
      entity.id,
      entity.word,
      entity.meaning,
      entity.wordTagIdList.map(({ tagId }) => tagId),
    );
  }

  async updateWord(word: Word): Promise<void> {
    const entity = this.toEntity(word);
    await this.wordsRepository.save(entity);
  }

  async deleteWord(word: Word): Promise<void> {
    await this.wordsRepository.delete(word.id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from 'src/tags/tag.entity';
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
    entity.tags = word.tagIdList.map((id) => ({ id })) as TagEntity[];
    return entity;
  }

  /**
   * 単語とタグのリレーションを全て削除する。
   * 別集約なこともあり SQL で外部キーを設定していないため、逐次手動で削除する。
   * @param word リレーションを削除する単語
   */
  async removeAllTagRelations(word: Word): Promise<void> {
    await this.wordsRepository
      .createQueryBuilder()
      .delete()
      .from('word_tag')
      .where('word_id = :wordId', { wordId: word.id })
      .execute();
  }

  /**
   * 単語を全て取得する。
   * タグ ID も含めて取得するが、存在しないタグは ORM によって除外される。
   * @returns 単語のリスト
   */
  async findWords(): Promise<Word[]> {
    const wordEntities = await this.wordsRepository.find({
      relations: { tags: true },
    });
    return wordEntities.map((word) =>
      Word.reconstruct(
        word.id,
        word.word,
        word.meaning,
        word.tags.map(({ id }) => id),
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
      saved.tags.map(({ id }) => id),
    );
  }

  async findById(id: string): Promise<Word | null> {
    const entity = await this.wordsRepository.findOne({
      where: { id },
      relations: { tags: true },
    });

    if (!entity) return null;
    return Word.reconstruct(
      entity.id,
      entity.word,
      entity.meaning,
      entity.tags.map(({ id }) => id),
    );
  }

  async updateWord(word: Word): Promise<void> {
    await this.removeAllTagRelations(word);

    const entity = this.toEntity(word);
    await this.wordsRepository.save(entity);
  }

  async deleteWord(word: Word): Promise<void> {
    await this.removeAllTagRelations(word);
    await this.wordsRepository.delete(word.id);
  }
}

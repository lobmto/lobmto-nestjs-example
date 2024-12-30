import { Injectable, NotFoundException } from '@nestjs/common';
import { TagsRepository } from 'src/tags/tags.repository';
import { Word } from './word.domain';
import { WordsRepository } from './words.repository';

@Injectable()
export class WordsService {
  constructor(
    private wordsRepository: WordsRepository,
    private tagsRepository: TagsRepository,
  ) {}

  async findWords(): Promise<Word[]> {
    return this.wordsRepository.findWords();
  }

  async registerWord(data: {
    word: string;
    meaning: string;
    tagIdList: string[];
  }): Promise<Word> {
    const tags = await this.tagsRepository.findByIds(data.tagIdList);
    if (tags.length !== data.tagIdList.length) {
      throw new NotFoundException('指定されたタグが見つかりません');
    }

    const word = Word.create(data.word, data.meaning, data.tagIdList);

    return this.wordsRepository.registerWord(word);
  }

  async findById(id: string): Promise<Word> {
    const word = await this.wordsRepository.findById(id);

    if (!word) {
      throw new NotFoundException(`ID: ${id} の単語が見つかりません`);
    }

    return word;
  }

  async updateWord(
    id: string,
    data: { word?: string; meaning?: string; tagIdList?: string[] },
  ): Promise<void> {
    // NOTE: 整合性は不要なのでトランザクションは設定していない
    const word = await this.wordsRepository.findById(id);
    if (!word) {
      throw new NotFoundException(`ID: ${id} の単語が見つかりません`);
    }

    const tags = await this.tagsRepository.findByIds(data.tagIdList ?? []);
    if (tags.length !== (data.tagIdList ?? []).length) {
      throw new NotFoundException('指定されたタグが見つかりません');
    }

    const updatedWord = word.createUpdated(data);
    await this.wordsRepository.updateWord(updatedWord);
  }

  async deleteWord(id: string): Promise<void> {
    const word = await this.wordsRepository.findById(id);
    if (!word) {
      throw new NotFoundException(`ID: ${id} の単語が見つかりません`);
    }

    await this.wordsRepository.deleteWord(word);
  }
}

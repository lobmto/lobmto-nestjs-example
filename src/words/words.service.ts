import { Injectable, NotFoundException } from '@nestjs/common';
import { Word } from './word.domain';
import { WordsRepository } from './words.repository';

@Injectable()
export class WordsService {
  constructor(private wordsRepository: WordsRepository) {}

  async findWords(): Promise<Word[]> {
    return this.wordsRepository.findWords();
  }

  async registerWord(data: { word: string; meaning: string }): Promise<Word> {
    const word = Word.create(data.word, data.meaning);

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
    data: { word?: string; meaning?: string },
  ): Promise<void> {
    // NOTE: 整合性は不要なのでトランザクションは設定していない
    const word = await this.wordsRepository.findById(id);
    if (!word) {
      throw new NotFoundException(`ID: ${id} の単語が見つかりません`);
    }

    const updatedWord = word.createUpdated(data);
    await this.wordsRepository.updateWord(updatedWord);
  }

  async deleteWord(id: string): Promise<void> {
    const result = await this.wordsRepository.deleteWord(id);

    if (!result) {
      throw new NotFoundException(`ID: ${id} の単語が見つかりません`);
    }
  }
}

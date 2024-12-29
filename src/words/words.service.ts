import { Injectable, NotFoundException } from '@nestjs/common';
import { Word } from './word.entity';
import { WordsRepository } from './words.repository';

@Injectable()
export class WordsService {
  constructor(private wordsRepository: WordsRepository) {}

  async findWords(): Promise<Word[]> {
    return this.wordsRepository.findWords();
  }

  async registerWord(data: { word: string; meaning: string }): Promise<Word> {
    // FIXME: プロパティの追加漏れがあったら静的解析でエラーになるようにしたい
    const word = new Word();
    word.word = data.word;
    word.meaning = data.meaning;

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
    const word = await this.findById(id);

    if (!word) {
      throw new NotFoundException(`ID: ${id} の単語が見つかりません`);
    }

    await this.wordsRepository.updateWord(id, data);
  }

  async deleteWord(id: string): Promise<void> {
    const result = await this.wordsRepository.deleteWord(id);

    if (!result) {
      throw new NotFoundException(`ID: ${id} の単語が見つかりません`);
    }

    return;
  }
}

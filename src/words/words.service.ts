import { Injectable } from '@nestjs/common';
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

  // FIXME: 404 エラーを追加する
  async updateWord(
    id: string,
    data: { word?: string; meaning?: string },
  ): Promise<void> {
    await this.wordsRepository.updateWord(id, data);
  }
}

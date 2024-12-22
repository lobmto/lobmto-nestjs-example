import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterWordRequest } from './words.request';
import { WordsService } from './words.service';

@Controller('/words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  async getStatus(): Promise<{
    words: { id: string; word: string; meaning: string }[];
  }> {
    const words = await this.wordsService.findWords();
    return {
      words: words.map((word) => ({
        id: word.id,
        word: word.word,
        meaning: word.meaning,
      })),
    };
  }

  @Post()
  async registerWord(
    @Body() word: RegisterWordRequest,
  ): Promise<{ id: string; word: string; meaning: string }> {
    const createdWord = await this.wordsService.registerWord(word);
    return {
      id: createdWord.id,
      word: createdWord.word,
      meaning: createdWord.meaning,
    };
  }
}

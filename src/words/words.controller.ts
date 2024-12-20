import { Controller, Get } from '@nestjs/common';
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
}

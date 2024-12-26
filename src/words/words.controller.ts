import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RegisterWordRequest, UpdateWordRequest } from './words.request';
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

  @Patch(':id')
  @HttpCode(204)
  async updateWord(
    @Param('id') id: string,
    @Body() partialWord: UpdateWordRequest,
  ): Promise<void> {
    await this.wordsService.updateWord(id, partialWord);
  }

  // TODO: ID のバリデーション
  @Get(':id')
  async getWord(
    @Param('id') id: string,
  ): Promise<{ id: string; word: string; meaning: string }> {
    const word = await this.wordsService.findById(id);
    return {
      id: word.id,
      word: word.word,
      meaning: word.meaning,
    };
  }
}

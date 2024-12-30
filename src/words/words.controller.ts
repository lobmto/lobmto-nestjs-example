import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  RegisterWordRequest,
  UpdateWordRequest,
  WordIdRequest,
} from './words.request';
import { WordsService } from './words.service';

@Controller('/words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  async getWords(): Promise<{
    words: {
      id: string;
      word: string;
      meaning: string;
      tagList: { id: string }[];
    }[];
  }> {
    const words = await this.wordsService.findWords();
    return {
      words: words.map((word) => ({
        id: word.id,
        word: word.word,
        meaning: word.meaning,
        tagList: word.tagIdList.map((id) => ({ id })),
      })),
    };
  }

  @Post()
  async registerWord(@Body() word: RegisterWordRequest): Promise<{
    id: string;
    word: string;
    meaning: string;
    tagList: { id: string }[];
  }> {
    const createdWord = await this.wordsService.registerWord(word);
    return {
      id: createdWord.id,
      word: createdWord.word,
      meaning: createdWord.meaning,
      tagList: createdWord.tagIdList.map((id: string) => ({ id })),
    };
  }

  @Get(':id')
  async getWord(@Param() { id }: WordIdRequest): Promise<{
    id: string;
    word: string;
    meaning: string;
    tagList: { id: string }[];
  }> {
    const word = await this.wordsService.findById(id);
    return {
      id: word.id,
      word: word.word,
      meaning: word.meaning,
      tagList: word.tagIdList.map((id) => ({ id })),
    };
  }

  @Patch(':id')
  @HttpCode(204)
  async updateWord(
    @Param() { id }: WordIdRequest,
    @Body() partialWord: UpdateWordRequest,
  ): Promise<void> {
    await this.wordsService.updateWord(id, partialWord);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteWord(@Param() { id }: WordIdRequest): Promise<void> {
    await this.wordsService.deleteWord(id);
  }
}

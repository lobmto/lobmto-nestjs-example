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
  RegisterTagRequest,
  TagIdRequest,
  UpdateTagRequest,
} from './tags.request';
import { TagsService } from './tags.service';

@Controller('/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async getTags(): Promise<{
    tags: { id: string; name: string }[];
  }> {
    const tags = await this.tagsService.findTags();
    return {
      tags: tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),
    };
  }

  @Post()
  async registerTags(
    @Body() tag: RegisterTagRequest,
  ): Promise<{ id: string; name: string }> {
    const createdTag = await this.tagsService.registerTag(tag);
    return {
      id: createdTag.id,
      name: createdTag.name,
    };
  }

  @Get(':id')
  async getTag(
    @Param() { id }: TagIdRequest,
  ): Promise<{ id: string; name: string }> {
    const tag = await this.tagsService.findById(id);
    return {
      id: tag.id,
      name: tag.name,
    };
  }

  @Patch(':id')
  @HttpCode(204)
  async updateTag(
    @Param() { id }: TagIdRequest,
    @Body() partialTag: UpdateTagRequest,
  ): Promise<void> {
    await this.tagsService.updateTag(id, partialTag);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTag(@Param() { id }: TagIdRequest): Promise<void> {
    await this.tagsService.deleteTag(id);
  }
}

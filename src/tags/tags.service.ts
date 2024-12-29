import { Injectable, NotFoundException } from '@nestjs/common';
import { Tag } from './tag.domain';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsService {
  constructor(private tagsRepository: TagsRepository) {}

  async findTags(): Promise<Tag[]> {
    return this.tagsRepository.findTags();
  }

  async registerTag(data: { name: string }): Promise<Tag> {
    const tag = Tag.create(data.name);

    return this.tagsRepository.registerTag(tag);
  }

  async findById(id: string): Promise<Tag> {
    const tag = await this.tagsRepository.findById(id);

    if (!tag) {
      throw new NotFoundException(`ID: ${id} のタグが見つかりません`);
    }

    return tag;
  }

  async updateTag(id: string, data: { name?: string }): Promise<void> {
    // NOTE: 整合性は不要なのでトランザクションは設定していない
    const tag = await this.tagsRepository.findById(id);
    if (!tag) {
      throw new NotFoundException(`ID: ${id} のタグが見つかりません`);
    }

    const updatedTag = tag.createUpdated(data);
    await this.tagsRepository.updateTag(updatedTag);
  }

  async deleteTag(id: string): Promise<void> {
    const result = await this.tagsRepository.deleteTag(id);

    if (!result) {
      throw new NotFoundException(`ID: ${id} のタグが見つかりません`);
    }
  }
}

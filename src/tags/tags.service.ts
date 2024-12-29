import { Injectable, NotFoundException } from '@nestjs/common';
import { TagEntity } from './tag.entity';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository: TagsRepository) {}

  async findTags(): Promise<TagEntity[]> {
    return this.tagsRepository.findTags();
  }

  async registerTag(data: { name: string }): Promise<TagEntity> {
    // FIXME: プロパティの追加漏れがあったら静的解析でエラーになるようにしたい
    const tag = new TagEntity();
    tag.name = data.name;

    return this.tagsRepository.registerTag(tag);
  }

  async findById(id: string): Promise<TagEntity> {
    const tag = await this.tagsRepository.findById(id);

    if (!tag) {
      throw new NotFoundException(`ID: ${id} のタグが見つかりません`);
    }

    return tag;
  }

  async updateTag(id: string, data: { name?: string }): Promise<void> {
    const tag = await this.tagsRepository.findById(id);

    if (!tag) {
      throw new NotFoundException(`ID: ${id} のタグが見つかりません`);
    }

    await this.tagsRepository.updateTag(id, data);
  }

  async deleteTag(id: string): Promise<void> {
    const result = await this.tagsRepository.deleteTag(id);

    if (!result) {
      throw new NotFoundException(`ID: ${id} のタグが見つかりません`);
    }

    return;
  }
}

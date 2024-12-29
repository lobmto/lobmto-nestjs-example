import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagsRepository {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async findTags(): Promise<Tag[]> {
    return await this.tagsRepository.find();
  }

  async registerTag(tag: Tag): Promise<Tag> {
    return await this.tagsRepository.save(tag);
  }

  async findById(id: string): Promise<Tag | null> {
    return await this.tagsRepository.findOne({ where: { id } });
  }

  async updateTag(id: string, data: { name?: string }): Promise<void> {
    if (Object.keys(data).length === 0) return;
    await this.tagsRepository.update(id, data);
  }

  async deleteTag(id: string): Promise<boolean> {
    const result = await this.tagsRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}

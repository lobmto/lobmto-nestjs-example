import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagsRepository {
  constructor(
    @InjectRepository(TagEntity)
    private tagsRepository: Repository<TagEntity>,
  ) {}

  async findTags(): Promise<TagEntity[]> {
    return await this.tagsRepository.find();
  }

  async registerTag(tag: TagEntity): Promise<TagEntity> {
    return await this.tagsRepository.save(tag);
  }

  async findById(id: string): Promise<TagEntity | null> {
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

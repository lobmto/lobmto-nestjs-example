import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.domain';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagsRepository {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagsRepository: Repository<TagEntity>,
  ) {}

  private toEntity(tag: Tag): TagEntity {
    const entity = new TagEntity();
    entity.id = tag.id;
    entity.name = tag.name;
    return entity;
  }

  async findTags(): Promise<Tag[]> {
    const entities = await this.tagsRepository.find();
    return entities.map((entity) => Tag.reconstruct(entity.id, entity.name));
  }

  async registerTag(tag: Tag): Promise<Tag> {
    const entity = this.toEntity(tag);

    const saved = await this.tagsRepository.save(entity);
    return Tag.reconstruct(saved.id, saved.name);
  }

  async findById(id: string): Promise<Tag | null> {
    const entity = await this.tagsRepository.findOne({ where: { id } });

    if (!entity) return null;
    return Tag.reconstruct(entity.id, entity.name);
  }

  async updateTag(tag: Tag): Promise<void> {
    const entity = this.toEntity(tag);
    await this.tagsRepository.save(entity);
  }

  async deleteTag(id: string): Promise<boolean> {
    const result = await this.tagsRepository.delete(id);

    const isDeleted = (result.affected ?? 0) > 0;
    return isDeleted;
  }
}

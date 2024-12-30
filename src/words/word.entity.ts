import { TagEntity } from 'src/tags/tag.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity('word')
export class WordEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  word: string;

  @Column()
  meaning: string;

  @ManyToMany(() => TagEntity, (tag) => tag.words, {
    createForeignKeyConstraints: false,
  })
  @JoinTable({
    name: 'word_tag',
    joinColumn: { name: 'word_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: TagEntity[];
}

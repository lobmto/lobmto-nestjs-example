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

  // 別集約のため、createForeignKeyConstraints を false に設定している
  // リレーション設定しない方が良い気もするが、 TypeORM の練習として記述する
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

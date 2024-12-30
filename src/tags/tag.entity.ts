import { WordEntity } from 'src/words/word.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => WordEntity, (word) => word.tags)
  words: WordEntity[];
}

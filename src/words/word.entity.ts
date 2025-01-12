import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';

@Entity('word')
export class WordEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  word: string;

  @OneToMany(() => MeaningEntity, (meaning) => meaning.word, {
    cascade: true,
  })
  meaningList: MeaningEntity[];

  @OneToMany(() => WordTagIdEntity, (wordTag) => wordTag.word, {
    cascade: true,
  })
  wordTagIdList: WordTagIdEntity[];
}

@Entity('meaning')
export class MeaningEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  meaning: string;

  @ManyToOne(() => WordEntity, (word) => word.meaningList, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  word: WordEntity;
}

// タグは別集約とみなす（ことにした）ので、ID参照でリレーションを設定する
@Entity('word_tag_id')
@Index(['tagId', 'wordId'], { unique: true })
export class WordTagIdEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  tagId: string;

  @Column('uuid', { nullable: false })
  wordId: string;

  @ManyToOne(() => WordEntity, (word) => word.wordTagIdList, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'wordId', referencedColumnName: 'id' })
  word: WordEntity;
}

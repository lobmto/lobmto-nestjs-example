import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('word')
export class WordEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  word: string;

  @Column()
  meaning: string;
}

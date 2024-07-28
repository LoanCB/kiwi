import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToMany, Relation } from 'typeorm';
import { Category } from './category.entity';
import { Note } from './note.entity';

@Entity()
export class Keyword extends BaseEntity {
  @ApiProperty({ description: 'Title of the keyword', example: 'fériés' })
  @Column({ unique: true })
  title: string;

  @ApiProperty({ type: () => Category })
  @ManyToMany(() => Category, (category) => category.keywords)
  categories: Relation<Category[]>;

  @ApiProperty({ type: () => Note })
  @ManyToMany(() => Note, (note) => note.keywords)
  notes: Relation<Note[]>;
}

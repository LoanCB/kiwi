import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, Relation } from 'typeorm';
import { Keyword } from './keyword.entity';
import { Note } from './note.entity';

@Entity()
export class Category extends BaseEntity {
  @ApiProperty({ description: 'Title of the category', example: 'Pagination' })
  @Column({ unique: true })
  title: string;

  @ApiPropertyOptional({
    description: 'Content of the category',
    example: 'Code portant sur le fonctionnement de la pagination',
    nullable: true,
  })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({ type: () => Keyword })
  @ManyToMany(() => Keyword, (keyword) => keyword.categories)
  @JoinTable()
  keywords: Relation<Keyword[]>;

  @ApiProperty({ type: () => Note })
  @OneToMany(() => Note, (note) => note.category)
  notes: Relation<Note[]>;
}

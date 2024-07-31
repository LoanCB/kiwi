import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, Relation } from 'typeorm';
import { ProgrammingLangage } from '../types/languages.types';
import { Keyword } from './keyword.entity';
import { Category } from './category.entity';
import { User } from 'src/users/entities/users.entity';
import { SoftDeleteEntity } from 'src/common/entities/soft-delete.entity';

@Entity()
export class Note extends SoftDeleteEntity {
  @ApiProperty({ description: 'Title of the note', example: 'Calcul des date des jours fériés' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Content of the note', example: 'Ceci est un contenu de note' })
  @Column({ type: 'text' })
  content: string;

  @ApiPropertyOptional({ description: 'Content of the note', example: 'console.log("abricot")' })
  @Column({ type: 'text', nullable: true })
  code?: string;

  @ApiProperty({
    enum: ProgrammingLangage,
    description: 'Langage(s) concerned by the note',
    example: [ProgrammingLangage.TYPESCRIPT, ProgrammingLangage.JAVASCRIPT],
  })
  @Column({ type: 'simple-array' })
  langages: ProgrammingLangage[];

  @ApiProperty({ type: () => Keyword, isArray: true })
  @ManyToMany(() => Keyword, (keyword) => keyword.notes)
  @JoinTable()
  keywords: Relation<Keyword[]>;

  @ApiProperty({ type: () => Category })
  @ManyToOne(() => Category, (category) => category.notes)
  category: Relation<Category>;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.notes)
  user: Relation<User>;
}

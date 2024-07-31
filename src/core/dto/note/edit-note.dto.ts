import { PickType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';
import { ProgrammingLanguage } from 'src/core/types/languages.types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class EditNoteDto extends PickType(CreateNoteDto, ['code']) {
  @ApiProperty({ example: 'Calcul du jour de pâques' })
  @IsString({ message: 'Title must be a string' })
  @MaxLength(255, { message: 'Title must contains less than 255 characters' })
  @IsOptional()
  title?: string;

  @ApiProperty({ example: "Code permettant de calculer dynamiquement le jour de pâques à partir d'une année donnée" })
  @IsString({ message: 'Content must be a string' })
  @MaxLength(2000, { message: 'Content must contains less than 2000 characters' })
  @IsOptional()
  content?: string;

  @ApiProperty({ enum: ProgrammingLanguage, example: [ProgrammingLanguage.JAVASCRIPT] })
  @IsArray({ message: 'Languages must be an array' })
  @IsEnum(ProgrammingLanguage, {
    each: true,
    message: `Languages must be an array containing one or more of the following values : ${Object.values(ProgrammingLanguage).join(' | ')}`,
  })
  @IsOptional()
  languages?: ProgrammingLanguage[];
}

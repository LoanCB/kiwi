import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ProgrammingLanguage } from 'src/core/types/languages.types';

export class CreateNoteDto {
  @ApiProperty({ example: 'Calcul du jour de pâques' })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(255, { message: 'Title must contains less than 255 characters' })
  title: string;

  @ApiProperty({ example: "Code permettant de calculer dynamiquement le jour de pâques à partir d'une année donnée" })
  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content is required' })
  @MaxLength(2000, { message: 'Content must contains less than 2000 characters' })
  content: string;

  @ApiProperty({ example: "console.log('Hello world');" })
  @IsArray({ message: 'Code must be an array' })
  @IsString({ each: true, message: 'Code must be an array of strings' })
  @IsOptional()
  code?: string[];

  @ApiProperty({ enum: ProgrammingLanguage, example: [ProgrammingLanguage.JAVASCRIPT] })
  @IsNotEmpty({ message: 'Languages is required' })
  @IsArray({ message: 'Languages must be an array' })
  @IsEnum(ProgrammingLanguage, {
    each: true,
    message: `Languages must be an array containing one or more of the following values : ${Object.values(ProgrammingLanguage).join(' | ')}`,
  })
  languages: ProgrammingLanguage[];
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';

export class EditCategoryDto extends PickType(CreateCategoryDto, ['description']) {
  @ApiPropertyOptional({ example: 'Typeorm' })
  @IsString({ message: 'Title must be a string' })
  @IsOptional({ message: 'Title is required' })
  title?: string;

  @ApiPropertyOptional({ example: [1, 2, 3] })
  @IsArray({ message: 'KeywordIds must be an array' })
  @IsInt({ each: true, message: 'KeywordIds must be an array of integers' })
  @IsOptional()
  keywordIds?: number[];

  @ApiPropertyOptional({ example: [1, 2, 3] })
  @IsArray({ message: 'NoteIds must be an array' })
  @IsInt({ each: true, message: 'NoteIds must be an array of integers' })
  @IsOptional()
  noteIds?: number[];
}

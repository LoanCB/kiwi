import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Typeorm' })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiPropertyOptional({ example: 'Notes basés sur typeorm.' })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

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

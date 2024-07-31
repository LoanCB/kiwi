import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateKeywordDto {
  @ApiProperty({ example: 'fériés' })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiPropertyOptional({ example: [1, 2, 3] })
  @IsArray({ message: 'CategoryIds must be an array' })
  @IsInt({ each: true, message: 'CategoryIds must be an array of integers' })
  @IsOptional()
  categoryIds?: number[];

  @ApiPropertyOptional({ example: [1, 2, 3] })
  @IsArray({ message: 'NoteIds must be an array' })
  @IsInt({ each: true, message: 'NoteIds must be an array of integers' })
  @IsOptional()
  noteIds?: number[];
}

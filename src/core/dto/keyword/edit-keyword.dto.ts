import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class EditKeywordDto {
  @ApiProperty({ example: 'fériés' })
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  title?: string;

  @ApiProperty({ example: [1, 2, 3] })
  @IsArray({ message: 'CategoryIds must be an array' })
  @IsInt({ each: true, message: 'CategoryIds must be an array of integers' })
  @IsOptional()
  categoryIds?: number[];

  @ApiProperty({ example: [1, 2, 3] })
  @IsArray({ message: 'NoteIds must be an array' })
  @IsInt({ each: true, message: 'NoteIds must be an array of integers' })
  @IsOptional()
  noteIds?: number[];
}

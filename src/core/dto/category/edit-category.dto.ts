import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsOptional, IsString } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';

export class EditCategoryDto extends PickType(CreateCategoryDto, ['description']) {
  @ApiPropertyOptional({ example: 'Typeorm' })
  @IsString({ message: 'Title must be a string' })
  @IsOptional({ message: 'Title is required' })
  title?: string;
}

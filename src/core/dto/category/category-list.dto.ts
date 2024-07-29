import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';

enum CategorySortableField {
  CREATED_DATE_FIELD = 'createdAt',
}

export class CategoryListDto extends OmitType(PaginationParamsDto, ['sortField']) {
  @ApiPropertyOptional({
    example: CategorySortableField.CREATED_DATE_FIELD,
    description: 'Name of the column to sort on',
    default: CategorySortableField.CREATED_DATE_FIELD,
    enum: CategorySortableField,
  })
  @IsEnum(CategorySortableField, {
    message: `Unknown sort field. Allowed values : ${Object.values(CategorySortableField).join(' | ')}`,
  })
  @IsOptional()
  sortField: CategorySortableField = CategorySortableField.CREATED_DATE_FIELD;
}

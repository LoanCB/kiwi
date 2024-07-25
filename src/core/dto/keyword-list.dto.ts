import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';

enum KeywordSortableField {
  CREATED_DATE_FIELD = 'createdAt',
}

export class KeywordListDto extends OmitType(PaginationParamsDto, ['sortField']) {
  @ApiPropertyOptional({
    example: KeywordSortableField.CREATED_DATE_FIELD,
    description: 'Name of the column to sort on',
    default: KeywordSortableField.CREATED_DATE_FIELD,
    enum: KeywordSortableField,
  })
  @IsEnum(KeywordSortableField, {
    message: `Unknown sort field. Allowed values : ${Object.values(KeywordSortableField).join(' | ')}`,
  })
  @IsOptional()
  sortField: KeywordSortableField = KeywordSortableField.CREATED_DATE_FIELD;
}

import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';

enum NoteSortableField {
  CREATED_DATE_FIELD = 'createdAt',
}

export class NoteListDto extends OmitType(PaginationParamsDto, ['sortField']) {
  @ApiPropertyOptional({
    example: NoteSortableField.CREATED_DATE_FIELD,
    description: 'Name of the column to sort on',
    default: NoteSortableField.CREATED_DATE_FIELD,
    enum: NoteSortableField,
  })
  @IsEnum(NoteSortableField, {
    message: `Unknown sort field. Allowed values : ${Object.values(NoteSortableField).join(' | ')}`,
  })
  @IsOptional()
  sortField: NoteSortableField = NoteSortableField.CREATED_DATE_FIELD;
}

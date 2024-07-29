import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommonSwaggerResponse } from 'src/common/helpers/common-swagger-config.helper';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { KeywordService } from '../services/keyword.service';
import { ErrorCodesService } from 'src/common/services/error-codes.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { RoleType } from 'src/users/types/role-type';
import { PaginatedList } from 'src/common/types/pagination-params.types';
import { Keyword } from '../entities/keyword.entity';
import { CustomHttpException } from 'src/common/helpers/custom.exception';
import { CreateKeywordDto } from '../dto/keyword/create-keyword.dto';
import { KeywordListDto } from '../dto/keyword/keyword-list.dto';
import { EditKeywordDto } from '../dto/keyword/edit-keyword.dto';

@Controller({
  path: 'keywords',
  version: ['1'],
})
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Keywords')
@CommonSwaggerResponse()
export class KeywordController {
  constructor(
    private readonly keywordService: KeywordService,
    private readonly errorCodesService: ErrorCodesService,
  ) {}

  @Post()
  @Roles(RoleType.MANAGER)
  async create(@Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordService.create(createKeywordDto);
  }

  @Get()
  @Roles(RoleType.READ_ONLY)
  async findAll(@Query() query: KeywordListDto): Promise<PaginatedList<Keyword>> {
    const [keywords, currentResults, totalResults] = await this.keywordService.findAll(query);
    return { ...query, totalResults, currentResults, results: keywords };
  }

  @Get(':id')
  @Roles(RoleType.READ_ONLY)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const keyword = await this.keywordService.findOneById(id);

    if (!keyword) {
      throw new CustomHttpException(
        'KEYWORD_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        this.errorCodesService.get('USER_NOT_FOUND', id),
      );
    }

    return keyword;
  }

  @Patch(':id')
  @Roles(RoleType.MANAGER)
  async editOne(@Param('id', ParseIntPipe) id: number, @Body() editKeywordDto: EditKeywordDto) {
    const keyword = await this.keywordService.findOneById(id);

    if (!keyword) {
      throw new CustomHttpException(
        'KEYWORD_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        this.errorCodesService.get('USER_NOT_FOUND', id),
      );
    }

    return await this.keywordService.editOne(keyword, editKeywordDto);
  }

  @Delete(':id')
  @Roles(RoleType.MANAGER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.keywordService.deleteOneById(id);
  }
}

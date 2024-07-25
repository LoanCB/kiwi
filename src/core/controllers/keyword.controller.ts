import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
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
import { KeywordListDto } from '../dto/keyword-list.dto';
import { CreateKeywordDto } from '../dto/create-keyword.dto';

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
  @Roles(RoleType.READ_ONLY)
  async create(@Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordService.create(createKeywordDto);
  }

  @Get()
  @Roles(RoleType.READ_ONLY)
  async findAll(@Query() query: KeywordListDto): Promise<PaginatedList<Keyword>> {
    const [keywords, currentResults, totalResults] = await this.keywordService.findAll(query);
    return { ...query, totalResults, currentResults, results: keywords };
  }
}

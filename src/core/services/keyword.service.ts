import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Keyword } from '../entities/keyword.entity';
import { Repository } from 'typeorm';
import { ErrorCodesService } from 'src/common/services/error-codes.service';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { EntityFilteredListResults } from 'src/common/types/filter-repository.types';
import { getEntityFilteredList } from 'src/common/helpers/filter-repository.helper';
import { CreateKeywordDto } from '../dto/create-keyword.dto';

@Injectable()
export class KeywordService {
  @InjectRepository(Keyword)
  keywordRepository: Repository<Keyword>;

  constructor(private errorCodesService: ErrorCodesService) {}

  async create(createKeywordDto: CreateKeywordDto) {
    return await this.keywordRepository.save(createKeywordDto);
  }

  async findAll(query: PaginationParamsDto): EntityFilteredListResults<Keyword> {
    const [keywords, totalResults] = await getEntityFilteredList({
      repository: this.keywordRepository,
      queryFilter: query,
      searchFields: ['title'],
    });
    return [keywords, keywords.length, totalResults];
  }
}

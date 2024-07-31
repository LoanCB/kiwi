import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Keyword } from '../entities/keyword.entity';
import { In, Repository } from 'typeorm';
import { ErrorCodesService } from 'src/common/services/error-codes.service';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { EntityFilteredListResults } from 'src/common/types/filter-repository.types';
import { getEntityFilteredList } from 'src/common/helpers/filter-repository.helper';
import { CustomHttpException } from 'src/common/helpers/custom.exception';
import { CreateKeywordDto } from '../dto/keyword/create-keyword.dto';
import { EditKeywordDto } from '../dto/keyword/edit-keyword.dto';
import { CategoryService } from './category.service';
import { NoteService } from './note.service';

@Injectable()
export class KeywordService {
  @InjectRepository(Keyword)
  keywordRepository: Repository<Keyword>;

  constructor(
    private errorCodesService: ErrorCodesService,
    private readonly categoryService: CategoryService,
    private readonly noteService: NoteService,
  ) {}

  async create(createKeywordDto: CreateKeywordDto) {
    const keyword = new Keyword();
    keyword.title = createKeywordDto.title;

    if (createKeywordDto.categoryIds) {
      const categories = await this.categoryService.findByIds(createKeywordDto.categoryIds);
      keyword.categories = categories;
    }

    if (createKeywordDto.noteIds) {
      const notes = await this.noteService.findByIds(createKeywordDto.noteIds);
      keyword.notes = notes;
    }

    return await this.keywordRepository.save(keyword);
  }

  async findAll(query: PaginationParamsDto): EntityFilteredListResults<Keyword> {
    const [keywords, totalResults] = await getEntityFilteredList({
      repository: this.keywordRepository,
      queryFilter: query,
      searchFields: ['title'],
    });
    return [keywords, keywords.length, totalResults];
  }

  async findByIds(ids: number[]) {
    return await this.keywordRepository.findBy({ id: In(ids) });
  }

  async findOneById(id: number) {
    return await this.keywordRepository.findOne({ where: { id } });
  }

  async editOne(keyword: Keyword, editKeywordDto: EditKeywordDto) {
    keyword.title = editKeywordDto.title;
    return await this.keywordRepository.save(keyword);
  }

  async deleteOneById(id: number) {
    const result = await this.keywordRepository.delete(id);
    if (result.affected === 0) {
      throw new CustomHttpException(
        'KEYWORD_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        this.errorCodesService.get('USER_NOT_FOUND', id),
      );
    }
  }
}

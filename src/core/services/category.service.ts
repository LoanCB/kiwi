import { HttpStatus, Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ErrorCodesService } from 'src/common/services/error-codes.service';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { EntityFilteredListResults } from 'src/common/types/filter-repository.types';
import { getEntityFilteredList } from 'src/common/helpers/filter-repository.helper';
import { EditCategoryDto } from '../dto/category/edit-category.dto';
import { CustomHttpException } from 'src/common/helpers/custom.exception';

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  categoryRepository: Repository<Category>;

  constructor(private errorCodesService: ErrorCodesService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(createCategoryDto);
  }

  async findAll(query: PaginationParamsDto): EntityFilteredListResults<Category> {
    const [category, totalResults] = await getEntityFilteredList({
      repository: this.categoryRepository,
      queryFilter: query,
      searchFields: ['title'],
    });
    return [category, category.length, totalResults];
  }

  async findByIds(ids: number[]) {
    return await this.categoryRepository.findBy({ id: In(ids) });
  }

  async findOneById(id: number) {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async editOne(category: Category, editKeywordDto: EditCategoryDto) {
    Object.assign(category, editKeywordDto);
    return await this.categoryRepository.save(category);
  }

  async deleteOneById(id: number) {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new CustomHttpException(
        'CATEGORY_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        this.errorCodesService.get('CATEGORY_NOT_FOUND', id),
      );
    }
  }
}

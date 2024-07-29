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
import { CategoryService } from '../services/category.service';
import { ErrorCodesService } from 'src/common/services/error-codes.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { RoleType } from 'src/users/types/role-type';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { CategoryListDto } from '../dto/category/category-list.dto';
import { PaginatedList } from 'src/common/types/pagination-params.types';
import { Category } from '../entities/category.entity';
import { CustomHttpException } from 'src/common/helpers/custom.exception';
import { EditCategoryDto } from '../dto/category/edit-category.dto';

@Controller({
  path: 'categories',
  version: ['1'],
})
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Keywords')
@CommonSwaggerResponse()
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly errorCodesService: ErrorCodesService,
  ) {}

  @Post()
  @Roles(RoleType.MANAGER)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @Roles(RoleType.READ_ONLY)
  async findAll(@Query() query: CategoryListDto): Promise<PaginatedList<Category>> {
    const [categories, currentResults, totalResults] = await this.categoryService.findAll(query);
    return { ...query, totalResults, currentResults, results: categories };
  }

  @Get(':id')
  @Roles(RoleType.READ_ONLY)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoryService.findOneById(id);

    if (!category) {
      throw new CustomHttpException(
        'CATEGORY_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        this.errorCodesService.get('USER_NOT_FOUND', id),
      );
    }

    return category;
  }

  @Patch(':id')
  @Roles(RoleType.MANAGER)
  async editOne(@Param('id', ParseIntPipe) id: number, @Body() editCategoryDto: EditCategoryDto) {
    const category = await this.categoryService.findOneById(id);

    if (!category) {
      throw new CustomHttpException(
        'CATEGORY_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        this.errorCodesService.get('USER_NOT_FOUND', id),
      );
    }

    return await this.categoryService.editOne(category, editCategoryDto);
  }

  @Delete(':id')
  @Roles(RoleType.MANAGER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    await this.categoryService.deleteOneById(id);
  }
}

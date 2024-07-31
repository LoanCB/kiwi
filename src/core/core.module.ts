import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';
import { Note } from './entities/note.entity';
import { Category } from './entities/category.entity';
import { Keyword } from './entities/keyword.entity';
import { KeywordService } from './services/keyword.service';
import { KeywordController } from './controllers/keyword.controller';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { NoteController } from './controllers/note.controller';
import { NoteService } from './services/note.service';

@Module({
  imports: [CommonModule, UsersModule, TypeOrmModule.forFeature([Note, Category, Keyword])],
  controllers: [KeywordController, CategoryController, NoteController],
  providers: [KeywordService, CategoryService, NoteService],
  exports: [],
})
export class CoreModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';
import { Note } from './entities/note.entity';
import { Category } from './entities/category.entity';
import { Keyword } from './entities/keyword.entity';

@Module({
  imports: [CommonModule, UsersModule, TypeOrmModule.forFeature([Note, Category, Keyword])],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {}

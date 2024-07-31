import { EditNoteDto } from './../dto/note/edit-note.dto';
import { ErrorCodesService } from 'src/common/services/error-codes.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../entities/note.entity';
import { In, Repository } from 'typeorm';
import { CreateNoteDto } from '../dto/note/create-note.dto';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { EntityFilteredListResults } from 'src/common/types/filter-repository.types';
import { getEntityFilteredList } from 'src/common/helpers/filter-repository.helper';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class NoteService {
  @InjectRepository(Note)
  noteRepository: Repository<Note>;

  constructor(private readonly errorCodesService: ErrorCodesService) {}

  async create(createNoteDto: CreateNoteDto, user: User) {
    return await this.noteRepository.save({ ...createNoteDto, user });
  }

  async findAll(query: PaginationParamsDto): EntityFilteredListResults<Note> {
    const [notes, totalResults] = await getEntityFilteredList({
      repository: this.noteRepository,
      queryFilter: query,
      searchFields: ['c.name', 'title', 'k.title'],
      relations: [
        { relation: 'category', alias: 'c' },
        { relation: 'keywords', alias: 'k' },
      ],
    });
    return [notes, notes.length, totalResults];
  }

  async findByIds(ids: number[]) {
    return await this.noteRepository.findBy({ id: In(ids) });
  }

  async findOneById(id: number) {
    return await this.noteRepository.findOne({ where: { id }, relations: { user: true } });
  }

  async editOne(note: Note, editNoteDto: EditNoteDto) {
    Object.assign(note, editNoteDto);
    return await this.noteRepository.save(note);
  }

  async deleteOneById(id: number) {
    return await this.noteRepository.delete(id);
  }
}

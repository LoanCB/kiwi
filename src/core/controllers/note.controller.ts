import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  Request,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommonSwaggerResponse } from 'src/common/helpers/common-swagger-config.helper';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { NoteService } from '../services/note.service';
import { ErrorCodesService } from 'src/common/services/error-codes.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { RoleType } from 'src/users/types/role-type';
import { CreateNoteDto } from '../dto/note/create-note.dto';
import { NoteListDto } from '../dto/note/note-list.dto';
import { PaginatedList } from 'src/common/types/pagination-params.types';
import { Note } from '../entities/note.entity';
import { CustomHttpException } from 'src/common/helpers/custom.exception';
import { EditNoteDto } from '../dto/note/edit-note.dto';
import { Request as ExpressRequest } from 'express';
import { User } from 'src/users/entities/users.entity';

@Controller({
  path: 'notes',
  version: ['1'],
})
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Notes')
@CommonSwaggerResponse()
export class NoteController {
  constructor(
    private readonly noteService: NoteService,
    private readonly errorCodesService: ErrorCodesService,
  ) {}

  @Post()
  @Roles(RoleType.READ_ONLY)
  async create(@Body() createNoteDto: CreateNoteDto, @Request() req: ExpressRequest) {
    const loggedUser = req.user as User;
    return this.noteService.create(createNoteDto, loggedUser);
  }

  @Get()
  @Roles(RoleType.READ_ONLY)
  async findAll(@Query() query: NoteListDto): Promise<PaginatedList<Note>> {
    const [notes, currentResults, totalResults] = await this.noteService.findAll(query);
    return { ...query, totalResults, currentResults, results: notes };
  }

  @Get(':id')
  @Roles(RoleType.READ_ONLY)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const note = await this.noteService.findOneById(id);

    if (!note) {
      throw new CustomHttpException(
        'NOTE_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        this.errorCodesService.get('USER_NOT_FOUND', id),
      );
    }

    return note;
  }

  @Patch(':id')
  @Roles(RoleType.READ_ONLY)
  async editOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() editNoteDto: EditNoteDto,
    @Request() req: ExpressRequest,
  ) {
    const note = await this.noteService.findOneById(id);
    const loggedUser = req.user as User;

    if (!note) {
      throw new CustomHttpException(
        'CATEGORY_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        this.errorCodesService.get('USER_NOT_FOUND', id),
      );
    }

    if (loggedUser.role.title !== RoleType.ADMINISTRATOR && loggedUser.id !== note.user.id) {
      throw new CustomHttpException('FORBIDDEN_EDIT_NOTE', HttpStatus.FORBIDDEN);
    }

    return await this.noteService.editOne(note, editNoteDto);
  }

  @Delete(':id')
  @Roles(RoleType.READ_ONLY)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id', ParseIntPipe) id: number, @Request() req: ExpressRequest) {
    const note = await this.noteService.findOneById(id);
    const loggedUser = req.user as User;

    if (!note) {
      throw new CustomHttpException(
        'CATEGORY_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        this.errorCodesService.get('USER_NOT_FOUND', id),
      );
    }

    if (loggedUser.role.title !== RoleType.ADMINISTRATOR && loggedUser.id !== note.user.id) {
      throw new CustomHttpException('FORBIDDEN_EDIT_NOTE', HttpStatus.FORBIDDEN);
    }

    await this.noteService.deleteOneById(note.id);
  }
}

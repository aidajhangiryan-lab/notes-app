import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { NotesService } from './notes.service.js';
import { NoteDocument } from './schemas/note.schema.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() dto: CreateNoteDto): Promise<NoteDocument> {
    return this.notesService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<NoteDocument> {
    return this.notesService.findOne(id);
  }

  @Get()
  findAll(): Promise<NoteDocument[]> {
    return this.notesService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateNoteDto,
  ): Promise<NoteDocument> {
    return this.notesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.notesService.remove(id);
  }
}

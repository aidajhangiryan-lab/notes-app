import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { NotesRepository } from './notes.repository.js';
import { NoteDocument } from './schemas/note.schema.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async create(dto: CreateNoteDto): Promise<NoteDocument> {
    return this.notesRepository.create(dto);
  }

  async findOne(id: string): Promise<NoteDocument> {
    const note = await this.notesRepository.findById(id);
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return note;
  }

  async findAll(): Promise<NoteDocument[]> {
    return this.notesRepository.findAll();
  }

  async update(id: string, dto: UpdateNoteDto): Promise<NoteDocument> {
    if (!(dto.body || dto.title)) {
      throw new BadRequestException(
        'Provide at least one field: title or body',
      );
    }

    const result = await this.notesRepository.update(id, dto);

    if (!result) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return result;
  }

  async remove(id: string): Promise<NoteDocument> {
    const result = await this.notesRepository.delete(id);
    if (!result) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return result;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { Note, NoteDocument } from './schemas/note.schema.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';

@Injectable()
export class NotesRepository {
  constructor(
    @InjectModel(Note.name) private readonly noteModel: Model<NoteDocument>,
  ) {}

  async create(dto: CreateNoteDto): Promise<NoteDocument> {
    return this.noteModel.create(dto);
  }
  async findAll(): Promise<NoteDocument[]> {
    return this.noteModel.find();
  }
  async findById(id: string): Promise<NoteDocument | null> {
    return this.noteModel.findById(id);
  }
  async update(id: string, dto: UpdateNoteDto): Promise<NoteDocument | null> {
    return this.noteModel.findByIdAndUpdate(id, dto, { new: true });
  }
  async delete(id: string): Promise<NoteDocument | null> {
    return this.noteModel.findByIdAndDelete(id);
  }
}

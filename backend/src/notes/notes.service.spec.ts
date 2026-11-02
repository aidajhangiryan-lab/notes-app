import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { NotesRepository } from './notes.repository.js';
import { NotesService } from './notes.service.js';
import { NoteDocument } from './schemas/note.schema.js';

const NOTE_ID = '65f3a1b2c3d4e5f6a7b8c9d0';

const fakeNote = {
  _id: NOTE_ID,
  title: 'Title',
  body: 'Body',
} as unknown as NoteDocument;

describe('NotesService', () => {
  let service: NotesService;
  let repository: Record<
    'create' | 'findAll' | 'findById' | 'update' | 'delete',
    Mock
  >;

  beforeEach(async () => {
    repository = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        NotesService,
        { provide: NotesRepository, useValue: repository },
      ],
    }).compile();

    service = moduleRef.get(NotesService);
  });

  describe('findOne', () => {
    it('returns the note when it exists', async () => {
      repository.findById.mockResolvedValue(fakeNote);

      const result = await service.findOne(NOTE_ID);

      expect(result).toBe(fakeNote);
      expect(repository.findById).toHaveBeenCalledWith(NOTE_ID);
    });

    it('throws NotFoundException when the note does not exist', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findOne(NOTE_ID)).rejects.toThrow(NotFoundException);
    });
  });

  describe('Create', () => {
    it('returns note and repository.create have been called with same dto ', async () => {
      const dto = { title: 'Title', body: 'Body' };
      repository.create.mockResolvedValue(fakeNote);

      const result = await service.create(dto);
      expect(result).toBe(fakeNote);
      expect(repository.create).toHaveBeenCalledWith(dto);
    });
  });
  describe('findAll', () => {
    it('finds all', async () => {
      repository.findAll.mockResolvedValue([fakeNote]);
      const result = await service.findAll();

      expect(result).toEqual([fakeNote]);
    });

    it('returns empty array when there are no notes', async () => {
      repository.findAll.mockResolvedValue([]);
      const result = await service.findAll();

      expect(result).toHaveLength(0);
    });
  });

  describe('update', () => {
    it('returns error then object is empty', async () => {
      await expect(service.update(NOTE_ID, {})).rejects.toThrow(
        BadRequestException,
      );
    });
    it('Dont update then id is inccorect', async () => {
      repository.update.mockResolvedValue(null);
      const dto = { title: 'New' };

      await expect(service.update(NOTE_ID, dto)).rejects.toThrow(
        NotFoundException,
      );
    });
    it('Do update if od is correct and dto is not empty', async () => {
      repository.update.mockResolvedValue(fakeNote);

      const dto = { title: 'New' };
      const result = await service.update(NOTE_ID, dto);
      expect(repository.update).toHaveBeenCalledWith(NOTE_ID, dto);
      expect(result).toEqual(fakeNote);
    });
  });
  describe('remove', () => {
    it('returns the deleted note', async () => {
      repository.delete.mockResolvedValue(fakeNote);

      const result = await service.remove(NOTE_ID);

      expect(result).toBe(fakeNote);
      expect(repository.delete).toHaveBeenCalledWith(NOTE_ID);
    });

    it('throws NotFoundException when the note does not exist', async () => {
      repository.delete.mockResolvedValue(null);

      await expect(service.remove(NOTE_ID)).rejects.toThrow(NotFoundException);
    });
  });
});

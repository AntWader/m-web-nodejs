import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateImageDto } from '../../../swapi/dto/create-image.dto';
import { Image } from '../../../swapi/entities/image.entity';
import { Person } from '../../../swapi/entities/person.entity';
import { mockPerson } from '../mock.entities';
import { MockRepository } from '../mock.repository';
import { ImagesService } from './images.service';

const expectedImageEntity = {
  id: expect.any(Number),
  key: expect.any(String),
  src: expect.any(String),
}

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(async () => {//Image, Person
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesService,
        {
          provide: getRepositoryToken(Image),
          useValue: new MockRepository(5, () => { return { id: 0, key: 'fdsgdfafgdfg', src: 'http://' } }),
        },
        {
          provide: getRepositoryToken(Person),
          useValue: new MockRepository(5, () => { return mockPerson }),
        },
      ],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
  });

  describe('create', () => {
    const entityDto: CreateImageDto = {
      key: '',
      src: ''
    }

    it('should return created entity', async () => {
      expect(await service.create(entityDto)).toEqual(expect.objectContaining(expectedImageEntity));
    });
  });

  describe('findAll', () => {
    it('should return an array of people', async () => {
      expect(await service.findAll()).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedImageEntity)])
      );
    });
  });

  // don't test getPage() method in this .spec

  describe('findOne', () => {
    const id = 1;

    it('should return a person', async () => {
      expect(await service.findOne(id)).toEqual(expect.objectContaining(expectedImageEntity));
    });
  });

  describe('update', () => {
    const id = 1;
    const updateDto = { key: 'localhost' };

    it('should return an updated person', async () => {
      expect(await service.update(id, updateDto)).toEqual(
        expect.objectContaining({
          ...expectedImageEntity,
          ...updateDto
        })
      );
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should return removed person', async () => {
      expect(await service.remove(id)).toEqual(
        expect.objectContaining(expectedImageEntity)
      );
    });
  });
});

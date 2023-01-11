import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateGenderDto } from '../../../swapi/dto/create-gender.dto';
import { Gender } from '../../../swapi/entities/gender.entity';
import { Person } from '../../../swapi/entities/person.entity';
import { mockPerson } from '../mock.entities';
import { MockRepository } from '../mock.repository';
import { GendersService } from './genders.service';

const expectedGenderEntity = {
  id: expect.any(Number),
  gender: expect.any(String)
}

describe('GendersService', () => {
  let service: GendersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GendersService,
        {
          provide: getRepositoryToken(Gender),
          useValue: new MockRepository(5, () => { return { id: 0, gender: 'gender' } }),
        },
        {
          provide: getRepositoryToken(Person),
          useValue: new MockRepository(5, () => { return mockPerson }),
        },
      ],
    }).compile();

    service = module.get<GendersService>(GendersService);
  });

  describe('create', () => {
    const entityDto: CreateGenderDto = {
      gender: 'new gender'
    }

    it('should return created entity', async () => {
      expect(await service.create(entityDto)).toEqual(expect.objectContaining(expectedGenderEntity));
    });
  });

  describe('findAll', () => {
    it('should return an array of genders', async () => {
      expect(await service.findAll()).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedGenderEntity)])
      );
    });
  });

  // don't test getPage() method in this .spec

  describe('findOne', () => {
    const id = 1;

    it('should return a gender', async () => {
      expect(await service.findOne(id)).toEqual(expect.objectContaining(expectedGenderEntity));
    });
  });

  describe('update', () => {
    const id = 1;
    const updateDto = { gender: 'localhost' };

    it('should return an updated gender', async () => {
      expect(await service.update(id, updateDto)).toEqual(
        expect.objectContaining({
          ...expectedGenderEntity,
          ...updateDto
        })
      );
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should return removed gender', async () => {
      expect(await service.remove(id)).toEqual(
        expect.objectContaining(expectedGenderEntity)
      );
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateSpeciesDto } from '../../../swapi/dto/create-species.dto';
import { Film } from '../../../swapi/entities/film.entity';
import { Person } from '../../../swapi/entities/person.entity';
import { Planet } from '../../../swapi/entities/planet.entity';
import { Species } from '../../../swapi/entities/species.entity';
import { mockFilm, mockPerson, mockPlanet, mockSpecies } from '../mock.entities';
import { MockRepository } from '../mock.repository';
import { SpeciesService } from './species.service';

const expectedSpeciesEntity = {
  id: expect.any(Number),
  name: expect.any(String),
  classification: expect.any(String),
  designation: expect.any(String),
  average_height: expect.any(Number),
  skin_colors: expect.any(String),
  hair_colors: expect.any(String),
  eye_colors: expect.any(String),
  average_lifespan: expect.any(Number),
  //homeworld: expect.any(String),
  language: expect.any(String),
  people: expect.arrayContaining<string>([]),
  films: expect.arrayContaining<string>([]),
  created: expect.any(Date),
  edited: expect.any(Date),
  url: expect.any(String),
}

describe('SpeciesService', () => {
  let service: SpeciesService;

  beforeEach(async () => {//Species, Planet, Person, Film
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpeciesService,
        {
          provide: getRepositoryToken(Species),
          useValue: new MockRepository(5, () => { return mockSpecies }),
        },
        {
          provide: getRepositoryToken(Planet),
          useValue: new MockRepository(5, () => { return mockPlanet }),
        },
        {
          provide: getRepositoryToken(Person),
          useValue: new MockRepository(5, () => { return mockPerson }),
        },
        {
          provide: getRepositoryToken(Film),
          useValue: new MockRepository(5, () => { return mockFilm }),
        },
      ],
    }).compile();

    service = module.get<SpeciesService>(SpeciesService);
  });

  describe('create', () => {
    const entityDto: CreateSpeciesDto = {
      name: '',
      classification: '',
      designation: '',
      average_height: 0,
      skin_colors: '',
      hair_colors: '',
      eye_colors: '',
      average_lifespan: 0,
      homeworld: '',
      language: '',
      people: [],
      films: [],
      created: new Date(),
      edited: new Date(),
      url: ''
    }

    it('should return created entity', async () => {
      expect(await service.create(entityDto)).toEqual(expect.objectContaining(expectedSpeciesEntity));
    });
  });

  describe('findAll', () => {
    it('should return an array of people', async () => {
      expect(await service.findAll()).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedSpeciesEntity)])
      );
    });
  });

  // don't test getPage() method in this .spec

  describe('findOne', () => {
    const id = 1;

    it('should return a person', async () => {
      expect(await service.findOne(id)).toEqual(expect.objectContaining(expectedSpeciesEntity));
    });
  });

  describe('update', () => {
    const id = 1;
    const updateDto = { url: 'localhost' };

    it('should return an updated person', async () => {
      expect(await service.update(id, updateDto)).toEqual(
        expect.objectContaining({
          ...expectedSpeciesEntity,
          ...updateDto
        })
      );
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should return removed person', async () => {
      expect(await service.remove(id)).toEqual(
        expect.objectContaining(expectedSpeciesEntity)
      );
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePlanetDto } from '../../../swapi/dto/create-planet.dto';
import { Film } from '../../../swapi/entities/film.entity';
import { Person } from '../../../swapi/entities/person.entity';
import { Planet } from '../../../swapi/entities/planet.entity';
import { Species } from '../../../swapi/entities/species.entity';
import { mockFilm, mockPerson, mockPlanet, mockSpecies } from '../mock.entities';
import { MockRepository } from '../mock.repository';
import { PlanetsService } from './planets.service';

const expectedPlanetEntity = {
  id: expect.any(Number),
  name: expect.any(String),
  rotation_period: expect.any(Number),
  orbital_period: expect.any(Number),
  diameter: expect.any(Number),
  climate: expect.any(String),
  gravity: expect.any(String),
  terrain: expect.any(String),
  surface_water: expect.any(Number),
  population: expect.any(Number),
  species: expect.arrayContaining<string>([]),
  residents: expect.arrayContaining<string>([]),
  films: expect.arrayContaining<string>([]),
  created: expect.any(Date),
  edited: expect.any(Date),
  url: expect.any(String),
}

describe('PlanetsService', () => {
  let service: PlanetsService;

  beforeEach(async () => {// Planet, Species, Person, Film
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetsService,
        {
          provide: getRepositoryToken(Planet),
          useValue: new MockRepository(5, () => { return mockPlanet }),
        },
        {
          provide: getRepositoryToken(Species),
          useValue: new MockRepository(5, () => { return mockSpecies }),
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

    service = module.get<PlanetsService>(PlanetsService);
  });

  describe('create', () => {
    const entityDto: CreatePlanetDto = {
      name: '',
      rotation_period: 0,
      orbital_period: 0,
      diameter: 0,
      climate: '',
      gravity: '',
      terrain: '',
      surface_water: 0,
      population: 0,
      species: [],
      residents: [],
      films: [],
      created: new Date(),
      edited: new Date(),
      url: ''
    }

    it('should return created entity', async () => {
      expect(await service.create(entityDto)).toEqual(expect.objectContaining(expectedPlanetEntity));
    });
  });

  describe('findAll', () => {
    it('should return an array of people', async () => {
      expect(await service.findAll()).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedPlanetEntity)])
      );
    });
  });

  // don't test getPage() method in this .spec

  describe('findOne', () => {
    const id = 1;

    it('should return a person', async () => {
      expect(await service.findOne(id)).toEqual(expect.objectContaining(expectedPlanetEntity));
    });
  });

  describe('update', () => {
    const id = 1;
    const updateDto = { url: 'localhost' };

    it('should return an updated person', async () => {
      expect(await service.update(id, updateDto)).toEqual(
        expect.objectContaining({
          ...expectedPlanetEntity,
          ...updateDto
        })
      );
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should return removed person', async () => {
      expect(await service.remove(id)).toEqual(
        expect.objectContaining(expectedPlanetEntity)
      );
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateFilmDto } from 'src/swapi/dto/create-film.dto';
import { Person } from '../../../swapi/entities/person.entity';
import { Planet } from '../../../swapi/entities/planet.entity';
import { Species } from '../../../swapi/entities/species.entity';
import { Starship } from '../../../swapi/entities/starship.entity';
import { Vehicle } from '../../../swapi/entities/vehicle.entity';
import { Film } from '../../../swapi/entities/film.entity';
import { MockRepository } from '../mock.repository';
import { FilmsService } from './films.service';
import { mockFilm, mockPerson, mockPlanet, mockSpecies, mockStarship, mockVehicle } from '../mock.entities';

const expectedFilmEntity = {
  id: expect.any(Number),
  title: expect.any(String),
  episode_id: expect.any(Number),
  director: expect.any(String),
  producer: expect.any(String),
  release_date: expect.any(Date),
  opening_crawl: expect.any(String),
  characters: expect.arrayContaining<string>([]),
  planets: expect.arrayContaining<string>([]),
  species: expect.arrayContaining<string>([]),
  starships: expect.arrayContaining<string>([]),
  vehicles: expect.arrayContaining<string>([]),
  created: expect.any(Date),
  edited: expect.any(Date),
  url: expect.any(String)
};

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: getRepositoryToken(Film),
          useValue: new MockRepository(5, () => { return mockFilm }),
        },
        {
          provide: getRepositoryToken(Person),
          useValue: new MockRepository(5, () => { return mockPerson }),
        },
        {
          provide: getRepositoryToken(Planet),
          useValue: new MockRepository(5, () => { return mockPlanet }),
        },
        {
          provide: getRepositoryToken(Starship),
          useValue: new MockRepository(5, () => { return mockStarship }),
        },
        {
          provide: getRepositoryToken(Vehicle),
          useValue: new MockRepository(5, () => { return mockVehicle }),
        },
        {
          provide: getRepositoryToken(Species),
          useValue: new MockRepository(5, () => { return mockSpecies }),
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  describe('create', () => {
    const entityDto: CreateFilmDto = {
      title: '',
      episode_id: 0,
      director: '',
      producer: '',
      release_date: new Date(),
      opening_crawl: '',
      characters: [],
      planets: [],
      species: [],
      starships: [],
      vehicles: [],
      created: new Date(),
      edited: new Date(),
      url: ''
    }

    it('should return created entity', async () => {
      expect(await service.create(entityDto)).toEqual(expect.objectContaining(expectedFilmEntity));
    });
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      expect(await service.findAll()).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedFilmEntity)])
      );
    });
  });

  // don't test getPage() method in this .spec

  describe('findOne', () => {
    const id = 1;

    it('should return a film', async () => {
      expect(await service.findOne(id)).toEqual(expect.objectContaining(expectedFilmEntity));
    });
  });

  describe('update', () => {
    const id = 1;
    const updateDto = { url: 'localhost' };

    it('should return an updated film', async () => {
      expect(await service.update(id, updateDto)).toEqual(
        expect.objectContaining({
          ...expectedFilmEntity,
          ...updateDto
        })
      );
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should return removed film', async () => {
      expect(await service.remove(id)).toEqual(
        expect.objectContaining(expectedFilmEntity)
      );
    });
  });
});

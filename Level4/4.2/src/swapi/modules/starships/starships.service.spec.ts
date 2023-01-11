import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateStarshipDto } from '../../../swapi/dto/create-starship.dto';
import { Film } from '../../../swapi/entities/film.entity';
import { Person } from '../../../swapi/entities/person.entity';
import { Starship } from '../../../swapi/entities/starship.entity';
import { mockFilm, mockPerson, mockStarship } from '../mock.entities';
import { MockRepository } from '../mock.repository';
import { StarshipsService } from './starships.service';

const expectedStarshipEntity = {
  id: expect.any(Number),
  name: expect.any(String),
  model: expect.any(String),
  manufacturer: expect.any(String),
  cost_in_credits: expect.any(Number),
  length: expect.any(Number),
  max_atmosphering_speed: expect.any(Number),
  crew: expect.any(String),
  passengers: expect.any(Number),
  cargo_capacity: expect.any(Number),
  consumables: expect.any(String),
  hyperdrive_rating: expect.any(Number),
  MGLT: expect.any(Number),
  starship_class: expect.any(String),
  pilots: expect.arrayContaining<string>([]),
  films: expect.arrayContaining<string>([]),
  created: expect.any(Date),
  edited: expect.any(Date),
  url: expect.any(String),
}

describe('StarshipsService', () => {
  let service: StarshipsService;

  beforeEach(async () => {//Starship, Person, Film
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarshipsService,
        {
          provide: getRepositoryToken(Starship),
          useValue: new MockRepository(5, () => { return mockStarship }),
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

    service = module.get<StarshipsService>(StarshipsService);
  });

  describe('create', () => {
    const entityDto: CreateStarshipDto = {
      name: '',
      model: '',
      manufacturer: '',
      cost_in_credits: 0,
      length: 0,
      max_atmosphering_speed: 0,
      crew: '',
      passengers: 0,
      cargo_capacity: 0,
      consumables: '',
      hyperdrive_rating: 0,
      MGLT: 0,
      starship_class: '',
      pilots: [],
      films: [],
      created: new Date(),
      edited: new Date(),
      url: ''
    }

    it('should return created entity', async () => {
      expect(await service.create(entityDto)).toEqual(expect.objectContaining(expectedStarshipEntity));
    });
  });

  describe('findAll', () => {
    it('should return an array of people', async () => {
      expect(await service.findAll()).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedStarshipEntity)])
      );
    });
  });

  // don't test getPage() method in this .spec

  describe('findOne', () => {
    const id = 1;

    it('should return a person', async () => {
      expect(await service.findOne(id)).toEqual(expect.objectContaining(expectedStarshipEntity));
    });
  });

  describe('update', () => {
    const id = 1;
    const updateDto = { url: 'localhost' };

    it('should return an updated person', async () => {
      expect(await service.update(id, updateDto)).toEqual(
        expect.objectContaining({
          ...expectedStarshipEntity,
          ...updateDto
        })
      );
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should return removed person', async () => {
      expect(await service.remove(id)).toEqual(
        expect.objectContaining(expectedStarshipEntity)
      );
    });
  });
});

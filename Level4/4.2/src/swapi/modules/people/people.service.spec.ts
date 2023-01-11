import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePersonDto } from '../../../swapi/dto/create-person.dto';
import { Film } from '../../../swapi/entities/film.entity';
import { Gender } from '../../../swapi/entities/gender.entity';
import { Image } from '../../../swapi/entities/image.entity';
import { Person } from '../../../swapi/entities/person.entity';
import { Planet } from '../../../swapi/entities/planet.entity';
import { Species } from '../../../swapi/entities/species.entity';
import { Starship } from '../../../swapi/entities/starship.entity';
import { Vehicle } from '../../../swapi/entities/vehicle.entity';
import { mockFilm, mockPerson, mockPlanet, mockSpecies, mockStarship, mockVehicle } from '../mock.entities';
import { MockRepository } from '../mock.repository';
import { PeopleService } from './people.service';

const expectedPersonEntity = {
  id: expect.any(Number),
  name: expect.any(String),
  height: expect.any(String),
  mass: expect.any(String),
  hair_color: expect.any(String),
  skin_color: expect.any(String),
  eye_color: expect.any(String),
  birth_year: expect.any(String),
  //gender: expect.any(String),
  //homeworld: expect.any(String),
  films: expect.arrayContaining<string>([]),
  species: expect.arrayContaining<string>([]),
  vehicles: expect.arrayContaining<string>([]),
  starships: expect.arrayContaining<string>([]),
  created: expect.any(Date),
  edited: expect.any(Date),
  url: expect.any(String),
}

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(async () => {// Person, Image, Gender, Planet, Film, Species, Vehicle, Starship
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: getRepositoryToken(Person),
          useValue: new MockRepository(5, () => { return mockPerson }),
        },
        {
          provide: getRepositoryToken(Image),
          useValue: new MockRepository(5, () => { return { id: 0 } }),
        },
        {
          provide: getRepositoryToken(Gender),
          useValue: new MockRepository(5, () => { return { id: 0 } }),
        },
        {
          provide: getRepositoryToken(Planet),
          useValue: new MockRepository(5, () => { return mockPlanet }),
        },
        {
          provide: getRepositoryToken(Film),
          useValue: new MockRepository(5, () => { return mockFilm }),
        },
        {
          provide: getRepositoryToken(Species),
          useValue: new MockRepository(5, () => { return mockSpecies }),
        },
        {
          provide: getRepositoryToken(Vehicle),
          useValue: new MockRepository(5, () => { return mockVehicle }),
        },
        {
          provide: getRepositoryToken(Starship),
          useValue: new MockRepository(5, () => { return mockStarship }),
        },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
  });

  describe('create', () => {
    const entityDto: CreatePersonDto = {
      name: '',
      height: '',
      mass: '',
      hair_color: '',
      skin_color: '',
      eye_color: '',
      birth_year: '',
      gender: '',
      homeworld: '',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: new Date(),
      edited: new Date(),
      url: ''
    }

    it('should return created entity', async () => {
      expect(await service.create(entityDto)).toEqual(expect.objectContaining(expectedPersonEntity));
    });
  });

  describe('findAll', () => {
    it('should return an array of people', async () => {
      expect(await service.findAll()).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedPersonEntity)])
      );
    });
  });

  // don't test getPage() method in this .spec

  describe('findOne', () => {
    const id = 1;

    it('should return a person', async () => {
      expect(await service.findOne(id)).toEqual(expect.objectContaining(expectedPersonEntity));
    });
  });

  describe('update', () => {
    const id = 1;
    const updateDto = { url: 'localhost' };

    it('should return an updated person', async () => {
      expect(await service.update(id, updateDto)).toEqual(
        expect.objectContaining({
          ...expectedPersonEntity,
          ...updateDto
        })
      );
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should return removed person', async () => {
      expect(await service.remove(id)).toEqual(
        expect.objectContaining(expectedPersonEntity)
      );
    });
  });
});

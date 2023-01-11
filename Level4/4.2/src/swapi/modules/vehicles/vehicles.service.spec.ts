import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateVehicleDto } from '../../../swapi/dto/create-vehicle.dto';
import { Film } from '../../../swapi/entities/film.entity';
import { Person } from '../../../swapi/entities/person.entity';
import { Vehicle } from '../../../swapi/entities/vehicle.entity';
import { mockFilm, mockPerson, mockVehicle } from '../mock.entities';
import { MockRepository } from '../mock.repository';
import { VehiclesService } from './vehicles.service';

const expectedVehicleEntity = {
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
  vehicle_class: expect.any(String),
  pilots: expect.arrayContaining<string>([]),
  films: expect.arrayContaining<string>([]),
  created: expect.any(Date),
  edited: expect.any(Date),
  url: expect.any(String),
}

describe('VehiclesService', () => {
  let service: VehiclesService;

  beforeEach(async () => {//Vehicle, Person, Film
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: new MockRepository(5, () => { return mockVehicle }),
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

    service = module.get<VehiclesService>(VehiclesService);
  });

  describe('create', () => {
    const entityDto: CreateVehicleDto = {
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
      vehicle_class: '',
      pilots: [],
      films: [],
      created: new Date(),
      edited: new Date(),
      url: ''
    }

    it('should return created entity', async () => {
      expect(await service.create(entityDto)).toEqual(expect.objectContaining(expectedVehicleEntity));
    });
  });

  describe('findAll', () => {
    it('should return an array of people', async () => {
      expect(await service.findAll()).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedVehicleEntity)])
      );
    });
  });

  // don't test getPage() method in this .spec

  describe('findOne', () => {
    const id = 1;

    it('should return a person', async () => {
      expect(await service.findOne(id)).toEqual(expect.objectContaining(expectedVehicleEntity));
    });
  });

  describe('update', () => {
    const id = 1;
    const updateDto = { url: 'localhost' };

    it('should return an updated person', async () => {
      expect(await service.update(id, updateDto)).toEqual(
        expect.objectContaining({
          ...expectedVehicleEntity,
          ...updateDto
        })
      );
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should return removed person', async () => {
      expect(await service.remove(id)).toEqual(
        expect.objectContaining(expectedVehicleEntity)
      );
    });
  });
});

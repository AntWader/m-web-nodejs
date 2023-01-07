import { Test, TestingModule } from '@nestjs/testing';
import { CreateVehicleDto } from 'src/swapi/dto/create-vehicle.dto';
import { MockService, notOk } from '../mock.service';
import { VehiclesController } from './vehicles.controller';
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
};

describe('VehiclesController', () => {
  let controller: VehiclesController;

  beforeEach(async () => {
    const mockService = new MockService(
      20,
      (_, i) => {
        return {
          id: i,
          name: `name #${i}`,
          model: `property #${i}`,
          manufacturer: `property #${i}`,
          cost_in_credits: 0,
          length: 0,
          max_atmosphering_speed: 0,
          crew: `property #${i}`,
          passengers: 0,
          cargo_capacity: 0,
          consumables: `property #${i}`,
          vehicle_class: `property #${i}`,
          pilots: ['https://pilot:)'],
          films: [],
          created: new Date(),
          edited: new Date(),
          url: `http://:${i})`,
        }
      }
    )

    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [VehiclesService],
    }).overrideProvider(VehiclesService).useValue(mockService).compile();

    controller = module.get<VehiclesController>(VehiclesController);
  });

  describe('create', () => {
    const entityDto: CreateVehicleDto = {
      name: 'Property',
      model: 'property',
      manufacturer: 'property',
      cost_in_credits: 0,
      length: 0,
      max_atmosphering_speed: 0,
      crew: 'property',
      passengers: 0,
      cargo_capacity: 0,
      consumables: 'property',
      vehicle_class: 'ok',
      pilots: [],
      films: [],
      created: new Date(),
      edited: new Date(),
      url: 'http://property',
    }

    it('should return created entity', async () => {
      expect(await controller.create(entityDto)).toEqual(expect.objectContaining(expectedVehicleEntity));
    });
  });

  describe('findAll', () => {
    it('should return an array of starships', async () => {
      expect(await controller.findAll()).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedVehicleEntity)])
      );
    });
  });

  describe('getPage', () => {
    const id = 1;
    const query = { page: id, path: 'default' };

    it('should return starships for the page', async () => {
      expect(await controller.getPage(query)).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedVehicleEntity)])
      );
    });

    it('should return error on attempt to find nonexisting page', async () => {
      expect(await controller.getPage({ ...query, ...{ page: -id } })).toEqual(notOk);
    });
  });

  describe('findOne', () => {
    const id = 1;

    it('should return a starship', async () => {
      expect(await controller.findOne(id)).toEqual(expect.objectContaining(expectedVehicleEntity));
    });

    it('should return return error on attempt to find nonexisting starship', async () => {
      expect(await controller.findOne(-id)).toEqual(notOk);
    });
  });

  describe('update', () => {
    const id = 1;
    const updateDto = { url: 'localhost' };

    it('should return an updated starship', async () => {
      expect(await controller.update(id, updateDto)).toEqual(
        expect.objectContaining({
          ...expectedVehicleEntity,
          ...updateDto
        })
      );
    });

    it('should return return error on update nonexisting starship', async () => {
      expect(await controller.update(-id, updateDto)).toEqual(notOk);
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should return removed starship', async () => {
      expect(await controller.remove(id)).toEqual(
        expect.objectContaining(expectedVehicleEntity)
      );
    });

    it('should return error on removing nonexisting starship', async () => {
      expect(await controller.remove(-id)).toEqual(notOk);
    });
  });
});

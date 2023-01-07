import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlanetDto } from 'src/swapi/dto/create-planet.dto';
import { MockService, notOk } from '../mock.service';
import { PlanetsController } from './planets.controller';
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
};

describe('PlanetsController', () => {
  let controller: PlanetsController;

  beforeEach(async () => {
    const mockService = new MockService(
      20,
      (_, i) => {
        return {
          id: i,
          name: `name #${i}`,
          rotation_period: 0,
          orbital_period: 0,
          diameter: 0,
          climate: `climate #${i}`,
          gravity: `gravity #${i}`,
          terrain: `terrain #${i}`,
          surface_water: 0,
          population: 0,
          species: ['http://species/1'],
          residents: [],
          films: [],
          created: new Date(),
          edited: new Date(),
          url: `http://:${i})`,
        }
      }
    )

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetsController],
      providers: [PlanetsService],
    }).overrideProvider(PlanetsService).useValue(mockService).compile();

    controller = module.get<PlanetsController>(PlanetsController);
  });

  describe('create', () => {
    const entityDto: CreatePlanetDto = {
      name: 'Name',
      rotation_period: 0,
      orbital_period: 0,
      diameter: 0,
      climate: 'climate',
      gravity: 'gravity',
      terrain: 'terrain',
      surface_water: 0,
      population: 0,
      species: ['http://species/1'],
      residents: [],
      films: [],
      created: new Date(),
      edited: new Date(),
      url: 'http://:)'
    }

    it('should return created entity', async () => {
      expect(await controller.create(entityDto)).toEqual(expect.objectContaining(expectedPlanetEntity));
    });
  });

  describe('findAll', () => {
    it('should return an array of planets', async () => {
      expect(await controller.findAll()).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedPlanetEntity)])
      );
    });
  });

  describe('getPage', () => {
    const id = 1;
    const query = { page: id, path: 'default' };

    it('should return planets for the page', async () => {
      expect(await controller.getPage(query)).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedPlanetEntity)])
      );
    });

    it('should return error on attempt to find nonexisting page', async () => {
      expect(await controller.getPage({ ...query, ...{ page: -id } })).toEqual(notOk);
    });
  });

  describe('findOne', () => {
    const id = 1;

    it('should return a planet', async () => {
      expect(await controller.findOne(id)).toEqual(expect.objectContaining(expectedPlanetEntity));
    });

    it('should return return error on attempt to find nonexisting planet', async () => {
      expect(await controller.findOne(-id)).toEqual(notOk);
    });
  });

  describe('update', () => {
    const id = 1;
    const updateDto = { url: 'localhost' };

    it('should return an updated planet', async () => {
      expect(await controller.update(id, updateDto)).toEqual(
        expect.objectContaining({
          ...expectedPlanetEntity,
          ...updateDto
        })
      );
    });

    it('should return return error on update nonexisting planet', async () => {
      expect(await controller.update(-id, updateDto)).toEqual(notOk);
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should return removed planet', async () => {
      expect(await controller.remove(id)).toEqual(
        expect.objectContaining(expectedPlanetEntity)
      );
    });

    it('should return error on removing nonexisting planet', async () => {
      expect(await controller.remove(-id)).toEqual(notOk);
    });
  });
});

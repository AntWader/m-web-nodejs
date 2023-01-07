import { Test, TestingModule } from '@nestjs/testing';
import { CreateSpeciesDto } from 'src/swapi/dto/create-species.dto';
import { MockService, notOk } from '../mock.service';
import { SpeciesController } from './species.controller';
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
  homeworld: expect.any(String),
  language: expect.any(String),
  people: expect.arrayContaining<string>([]),
  films: expect.arrayContaining<string>([]),
  created: expect.any(Date),
  edited: expect.any(Date),
  url: expect.any(String),
};

describe('SpeciesController', () => {
  let controller: SpeciesController;

  beforeEach(async () => {
    const mockService = new MockService(
      20,
      (_, i) => {
        return {
          id: i,
          name: `name #${i}`,
          classification: `property #${i}`,
          designation: `property #${i}`,
          average_height: 0,
          skin_colors: `property #${i}`,
          hair_colors: `property #${i}`,
          eye_colors: `property #${i}`,
          average_lifespan: 0,
          homeworld: `property #${i}`,
          language: `property #${i}`,
          people: ['http://person/1'],
          films: [],
          created: new Date(),
          edited: new Date(),
          url: `http://:${i})`,
        }
      }
    )

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeciesController],
      providers: [SpeciesService],
    }).overrideProvider(SpeciesService).useValue(mockService).compile();

    controller = module.get<SpeciesController>(SpeciesController);
  });

  describe('create', () => {
    const entityDto: CreateSpeciesDto = {
      name: 'property',
      classification: 'property',
      designation: 'property',
      average_height: 0,
      skin_colors: 'property',
      hair_colors: 'property',
      eye_colors: 'property',
      average_lifespan: 0,
      homeworld: 'property',
      language: 'property',
      people: [],
      films: [],
      created: new Date(),
      edited: new Date(),
      url: ''
    }

    it('should return created entity', async () => {
      expect(await controller.create(entityDto)).toEqual(expect.objectContaining(expectedSpeciesEntity));
    });
  });

  describe('findAll', () => {
    it('should return an array of planets', async () => {
      expect(await controller.findAll()).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedSpeciesEntity)])
      );
    });
  });

  describe('getPage', () => {
    const id = 1;
    const query = { page: id, path: 'default' };

    it('should return planets for the page', async () => {
      expect(await controller.getPage(query)).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedSpeciesEntity)])
      );
    });

    it('should return error on attempt to find nonexisting page', async () => {
      expect(await controller.getPage({ ...query, ...{ page: -id } })).toEqual(notOk);
    });
  });

  describe('findOne', () => {
    const id = 1;

    it('should return a planet', async () => {
      expect(await controller.findOne(id)).toEqual(expect.objectContaining(expectedSpeciesEntity));
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
          ...expectedSpeciesEntity,
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
        expect.objectContaining(expectedSpeciesEntity)
      );
    });

    it('should return error on removing nonexisting planet', async () => {
      expect(await controller.remove(-id)).toEqual(notOk);
    });
  });
});

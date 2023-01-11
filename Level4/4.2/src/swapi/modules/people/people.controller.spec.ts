import { Test, TestingModule } from '@nestjs/testing';
import { CreatePersonDto } from 'src/swapi/dto/create-person.dto';
import { MockService, notOk } from '../mock.service';
import { PeopleController } from './people.controller';
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
  gender: expect.any(String),
  homeworld: expect.any(String),
  films: expect.arrayContaining<string>([]),
  species: expect.arrayContaining<string>([]),
  vehicles: expect.arrayContaining<string>([]),
  starships: expect.arrayContaining<string>([]),
  created: expect.any(Date),
  edited: expect.any(Date),
  url: expect.any(String)
};

describe('PeopleController', () => {
  let controller: PeopleController;

  beforeEach(async () => {
    const mockService = new MockService(
      20,
      (_, i) => {
        return {
          id: i,
          name: `name #${i}`,
          height: 'height',
          mass: 'mass',
          hair_color: 'some color',
          skin_color: 'another some color',
          eye_color: 'and another one',
          birth_year: 'some year',
          gender: `gender #${i}`,
          homeworld: `planet #${i}`,
          films: [],
          species: [],
          vehicles: [],
          starships: [],
          created: new Date(),
          edited: new Date(),
          url: `url #${i}`
        }
      }
    )

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [PeopleService],
    }).overrideProvider(PeopleService).useValue(mockService).compile();

    controller = module.get<PeopleController>(PeopleController);
  });

  describe('create', () => {
    const entityDto: CreatePersonDto = {
      name: 'Name',
      height: 'height',
      mass: 'mass',
      hair_color: 'color',
      skin_color: 'skin',
      eye_color: 'eye',
      birth_year: '0001',
      gender: 'n/a',
      homeworld: 'planet',
      films: ['film1', 'film2'],
      species: [],
      vehicles: [],
      starships: [],
      created: new Date(),
      edited: new Date(),
      url: 'https://:)'
    }

    it('should return created entity', async () => {
      expect(await controller.create(entityDto)).toEqual(expect.objectContaining(expectedPersonEntity));
    });
  });

  describe('findAll', () => {
    it('should return an array of people', async () => {
      expect(await controller.findAll()).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedPersonEntity)])
      );
    });
  });

  describe('getPage', () => {
    const id = 1;
    const query = { page: id, path: 'default' };

    it('should return people for the page', async () => {
      expect(await controller.getPage(query)).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedPersonEntity)])
      );
    });

    it('should return error on attempt to find nonexisting page', async () => {
      expect(await controller.getPage({ ...query, ...{ page: -id } })).toEqual(notOk);
    });
  });

  describe('findOne', () => {
    const id = 1;

    it('should return a person', async () => {
      expect(await controller.findOne(id)).toEqual(expect.objectContaining(expectedPersonEntity));
    });

    it('should return return error on attempt to find nonexisting person', async () => {
      expect(await controller.findOne(-id)).toEqual(notOk);
    });
  });

  describe('update', () => {
    const id = 1;
    const updateDto = { url: 'localhost' };

    it('should return an updated person', async () => {
      expect(await controller.update(id, updateDto)).toEqual(
        expect.objectContaining({
          ...expectedPersonEntity,
          ...updateDto
        })
      );
    });

    it('should return return error on update nonexisting person', async () => {
      expect(await controller.update(-id, updateDto)).toEqual(notOk);
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should return removed person', async () => {
      expect(await controller.remove(id)).toEqual(
        expect.objectContaining(expectedPersonEntity)
      );
    });

    it('should return error on removing nonexisting person', async () => {
      expect(await controller.remove(-id)).toEqual(notOk);
    });
  });
});

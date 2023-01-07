import { Test, TestingModule } from '@nestjs/testing';
import { CreateFilmDto } from 'src/swapi/dto/create-film.dto';
import { MockService, notOk } from '../mock.service';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

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

describe('FilmsController', () => {
  let controller: FilmsController;

  beforeEach(async () => {
    const mockService = new MockService(
      20,
      (_, i) => {
        return {
          id: i,
          title: `test title #${i}`,
          episode_id: 0,
          director: `test director #${i}`,
          producer: `test produser #${i}`,
          release_date: new Date(),
          opening_crawl: `test something #${i}`,
          characters: ['https://characters/1', 'https://characters/2'],
          planets: ['https://planets/1'],
          species: [],
          starships: [],
          vehicles: [],
          created: new Date(),
          edited: new Date(),
          url: `url #${i}`
        }
      }
    )
    //console.log(mockService.findAll())

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    }).overrideProvider(FilmsService).useValue(mockService).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  describe('create', () => {
    const entityDto: CreateFilmDto = {
      title: 'test title',
      episode_id: 0,
      director: 'test director',
      producer: 'test produser',
      release_date: new Date(),
      opening_crawl: 'something',
      characters: [],
      planets: [],
      species: [],
      starships: [],
      vehicles: [],
      created: new Date(),
      edited: new Date(),
      url: 'http://test'
    }

    it('should return created entity', async () => {
      expect(await controller.create(entityDto)).toEqual(expect.objectContaining(expectedFilmEntity));
    });
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      expect(await controller.findAll()).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedFilmEntity)])
      );
    });
  });

  describe('getPage', () => {
    const id = 1;
    const query = { page: id, path: 'default' };

    it('should return films for the page', async () => {
      expect(await controller.getPage(query)).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedFilmEntity)])
      );
    });

    it('should return error on attempt to find nonexisting page', async () => {
      expect(await controller.getPage({ ...query, ...{ page: -id } })).toEqual(notOk);
    });
  });

  describe('findOne', () => {
    const id = 1;

    it('should return a film', async () => {
      expect(await controller.findOne(id)).toEqual(expect.objectContaining(expectedFilmEntity));
    });

    it('should return return error on attempt to find nonexisting film', async () => {
      expect(await controller.findOne(-id)).toEqual(notOk);
    });
  });

  describe('update', () => {
    const id = 1;
    const updateDto = { url: 'localhost' };

    it('should return an updated film', async () => {
      expect(await controller.update(id, updateDto)).toEqual(
        expect.objectContaining({
          ...expectedFilmEntity,
          ...updateDto
        })
      );
    });

    it('should return return error on update nonexisting film', async () => {
      expect(await controller.update(-id, updateDto)).toEqual(notOk);
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should return removed film', async () => {
      expect(await controller.remove(id)).toEqual(
        expect.objectContaining(expectedFilmEntity)
      );
    });

    it('should return error on removing nonexisting film', async () => {
      expect(await controller.remove(-id)).toEqual(notOk);
    });
  });
});

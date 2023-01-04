import { Test, TestingModule } from '@nestjs/testing';
import { CreateFilmDto } from 'src/swapi/dto/create-film.dto';
import { MockService, notOk } from '../mock.service';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;

  beforeEach(async () => {
    const mockService = new MockService(
      20,
      (_, i) => { return { id: i, url: `url #${i}` } }
    )

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
      expect(await controller.create(entityDto)).toEqual(
        expect.objectContaining({
          id: expect.any(Number)
        })
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      expect(await controller.findAll()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number)
          })
        ])
      );
    });
  });

  describe('getPage', () => {
    const id = 1;
    const query = { page: id, path: 'default' };

    it('should return films for the page', async () => {
      expect(await controller.getPage(query)).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number)
          })
        ])
      );
    });

    it('should return return error on attempt to find nonexisting page', async () => {
      expect(await controller.getPage({ ...query, ...{ page: -id } })).toEqual(notOk);
    });
  });

  describe('findOne', () => {
    const id = 1;

    it('should return a film', async () => {
      expect(await controller.findOne(id)).toEqual(
        expect.objectContaining({
          id: expect.any(Number)
        })
      );
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
          id: expect.any(Number),
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
        expect.objectContaining({
          id: expect.any(Number)
        })
      );
    });

    it('should return error on removing nonexisting film', async () => {
      expect(await controller.remove(-id)).toEqual(notOk);
    });
  });
});

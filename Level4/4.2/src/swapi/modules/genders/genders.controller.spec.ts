import { Test, TestingModule } from '@nestjs/testing';
import { CreateGenderDto } from 'src/swapi/dto/create-gender.dto';
import { MockService, notOk } from '../mock.service';
import { GendersController } from './genders.controller';
import { GendersService } from './genders.service';

const expectedGenderEntity = {
  id: expect.any(Number),
  gender: expect.any(String),
};

describe('GendersController', () => {
  let controller: GendersController;

  beforeEach(async () => {
    const mockService = new MockService(
      10,
      (_, i) => {
        return {
          id: i,
          gender: `gender #${i}`
        }
      }
    )

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GendersController],
      providers: [GendersService],
    }).overrideProvider(GendersService).useValue(mockService).compile();

    controller = module.get<GendersController>(GendersController);
  });

  describe('create', () => {
    const entityDto: CreateGenderDto = {
      gender: 'gender'
    }

    it('should return created entity', async () => {
      expect(await controller.create(entityDto)).toEqual(expect.objectContaining(expectedGenderEntity));
    });
  });

  describe('findAll', () => {
    it('should return an array of starships', async () => {
      expect(await controller.findAll()).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedGenderEntity)])
      );
    });
  });

  describe('getPage', () => {
    const id = 1;
    const query = { page: id, path: 'default' };

    it('should return starships for the page', async () => {
      expect(await controller.getPage(query)).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedGenderEntity)])
      );
    });

    it('should return error on attempt to find nonexisting page', async () => {
      expect(await controller.getPage({ ...query, ...{ page: -id } })).toEqual(notOk);
    });
  });

  describe('findOne', () => {
    const id = 1;

    it('should return a starship', async () => {
      expect(await controller.findOne(id)).toEqual(expect.objectContaining(expectedGenderEntity));
    });

    it('should return return error on attempt to find nonexisting starship', async () => {
      expect(await controller.findOne(-id)).toEqual(notOk);
    });
  });

  describe('update', () => {
    const id = 1;
    const updateDto = { gender: 'localhost' };

    it('should return an updated starship', async () => {
      expect(await controller.update(id, updateDto)).toEqual(
        expect.objectContaining({
          ...expectedGenderEntity,
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
        expect.objectContaining(expectedGenderEntity)
      );
    });

    it('should return error on removing nonexisting starship', async () => {
      expect(await controller.remove(-id)).toEqual(notOk);
    });
  });
});

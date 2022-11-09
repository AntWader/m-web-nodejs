import { Test, TestingModule } from '@nestjs/testing';
import { PeopleImgController } from './people.img.controller';
import { PeopleImgService } from './people.img.service';

describe('PeopleImgController', () => {
  let controller: PeopleImgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleImgController],
      providers: [PeopleImgService],
    }).compile();

    controller = module.get<PeopleImgController>(PeopleImgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

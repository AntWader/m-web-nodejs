import { Test, TestingModule } from '@nestjs/testing';
import { PeopleImgService } from './people.img.service';

describe('PeopleImgService', () => {
  let service: PeopleImgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeopleImgService],
    }).compile();

    service = module.get<PeopleImgService>(PeopleImgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { Readable } from 'node:stream';
import { S3Service } from '../../../s3/s3.service';
import { MockService, notOk } from '../mock.service';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Request as RequestType, Response as ResponseType } from 'express';

const expectedImageEntity = {
  id: expect.any(Number),
  key: expect.any(String),
  src: expect.any(String),
};

describe('ImagesController', () => {
  let controller: ImagesController;

  beforeEach(async () => {
    const mockService = new MockService(
      20,
      (_, i) => {
        return {
          id: i,
          key: `wgdasgz${i}`,
          src: `/${i}`
        }
      }
    )

    const mockUploader = {
      upload: (file: Express.Multer.File) => { return { Key: 'testKey' } }
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [ImagesService, S3Service],
    }).overrideProvider(ImagesService).useValue(mockService)
      .overrideProvider(S3Service).useValue(mockUploader)
      .compile();

    controller = module.get<ImagesController>(ImagesController);
  });

  describe('uploadImg', () => {
    const testFile: Express.Multer.File = {
      fieldname: '',
      originalname: '',
      encoding: '',
      mimetype: '',
      size: 0,
      stream: new Readable,
      destination: '',
      filename: '',
      path: '',
      buffer: Buffer.from('whatever')
    }

    const mockReq: RequestType = {
      protocol: 'http',
      //@ts-ignore
      get: (par: string) => { return 'testhost' }
    }

    it('should return created entity', async () => {
      expect(await controller.uploadImg(testFile, mockReq)).toEqual(expect.objectContaining(expectedImageEntity));
    });
  });

  describe('findAll', () => {
    it('should return an array of people', async () => {
      expect(await controller.findAll()).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedImageEntity)])
      );
    });
  });

  describe('findOne', () => {
    const id = 1;

    it('should return a person', async () => {
      expect(await controller.findOne(id)).toEqual(expect.objectContaining(expectedImageEntity));
    });

    it('should return return error on attempt to find nonexisting person', async () => {
      expect(await controller.findOne(-id)).toEqual(notOk);
    });
  });

  describe('update', () => {
    const id = 1;
    const updateDto = { src: 'localhost' };

    it('should return an updated person', async () => {
      expect(await controller.update(id, updateDto)).toEqual(
        expect.objectContaining({
          ...expectedImageEntity,
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
        expect.objectContaining(expectedImageEntity)
      );
    });

    it('should return error on removing nonexisting person', async () => {
      expect(await controller.remove(-id)).toEqual(notOk);
    });
  });
});

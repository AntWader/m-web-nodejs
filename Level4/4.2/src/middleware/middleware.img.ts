import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ImgUploader implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`${new Date()} Request...`);
    console.log(req.files)
    next();
  }
}

export function imgUpload(req: Request, res: Response, next: NextFunction) {
  console.log(`uploading...`);
  next();
};

export function imgDownload(req: Request, res: Response, next: NextFunction) {
  console.log(`downloading...`);
  next();
};
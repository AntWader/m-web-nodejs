import { Request, Response, NextFunction } from 'express';

export function imgUpload(req: Request, res: Response, next: NextFunction) {
  console.log(`uploading...`);
  next();
};

export function imgDownload(req: Request, res: Response, next: NextFunction) {
    console.log(`downloading...`);
    next();
  };
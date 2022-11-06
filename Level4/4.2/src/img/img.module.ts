import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { imgDownload, imgUpload } from './img.middleware';

@Module({
    exports: [imgUpload, imgDownload]
})
export class AppModule { }
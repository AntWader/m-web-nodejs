import { DynamicModule, Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { Image } from '../../entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../../database/database.module';
import { Person } from '../../entities/person.entity';
import { S3Service } from '../../../s3/s3.service';
import { S3Module } from '../../../s3/s3.module';

// @Module({
//   imports: [
//     DatabaseModule, TypeOrmModule.forFeature([Image, Person]),
//     S3Module,
//   ],
//   controllers: [ImagesController],
//   providers: [ImagesService, S3Service]
// })
// export class ImagesModule { }

@Module({
  imports: [
    TypeOrmModule.forFeature([Image, Person]),
    S3Module,
  ],
  controllers: [ImagesController],
  providers: [ImagesService, S3Service]
})
export class ImagesModule {
  static register(options: { db: any }): DynamicModule {
    return {
      module: ImagesModule,
      imports: [options.db],
    };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Images } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Images) private imgRepository: Repository<Images>,
  ) { }

  async create(createImageDto: CreateImageDto) {
    let img = this.imgRepository.create(createImageDto)
    await this.imgRepository.save(img);

    return 'This action adds a new image';
  }

  findAll(entity: string) {
    let found = this.imgRepository.find({
      where: {
        entity: entity,
      },
    });
    return found;

    //return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}

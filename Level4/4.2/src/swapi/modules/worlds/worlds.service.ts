import { Injectable } from '@nestjs/common';
import { CreateWorldDto } from '../../dto/create-world.dto';
import { UpdateWorldDto } from '../../dto/update-world.dto';

@Injectable()
export class WorldsService {
  create(createWorldDto: CreateWorldDto) {
    return 'This action adds a new world';
  }

  findAll() {
    return `This action returns all worlds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} world`;
  }

  update(id: number, updateWorldDto: UpdateWorldDto) {
    return `This action updates a #${id} world`;
  }

  remove(id: number) {
    return `This action removes a #${id} world`;
  }
}

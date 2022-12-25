import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from 'src/swapi/entities/gender.entity';
import { Repository } from 'typeorm';
import { CreateGenderDto } from '../../dto/create-gender.dto';
import { UpdateGenderDto } from '../../dto/update-gender.dto';
import { createEntity, findAllEntities, findOneEntity, removeEntity, updateEntity } from '../repository.service.exports';

@Injectable()
export class GendersService {
  constructor(
    @InjectRepository(Gender) private genderRepository: Repository<Gender>,
  ) { }

  async create(createGenderDto: CreateGenderDto) {
    return await createEntity(this.genderRepository, createGenderDto);
  }

  async findAll() {
    return await findAllEntities(this.genderRepository);
  }

  async findOne(id: number) {
    return await findOneEntity(id, this.genderRepository);
  }

  async update(id: number, updateGenderDto: UpdateGenderDto) {
    return await updateEntity(id, this.genderRepository, updateGenderDto);
  }

  async remove(id: number) {
    return await removeEntity(id, this.genderRepository);
  }
}

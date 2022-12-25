import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from '../../dto/create-image.dto';
import { UpdateImageDto } from '../../dto/update-image.dto';
import { Image } from '../../entities/image.entity';
import { Person } from '../../entities/person.entity';
import { createEntity, findAllEntities, findOneEntity, removeEntity, updateEntity } from '../repository.service.exports';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private imgRepository: Repository<Image>,
    @InjectRepository(Person) private personRepository: Repository<Person>,
  ) { }

  async create(createImageDto: CreateImageDto) {
    return await createEntity(this.imgRepository, createImageDto);
  }

  async createAndLink(entityId: number, createImageDto: CreateImageDto) {
    let person = await findOneEntity(entityId, this.personRepository) as Person;

    person.images.push(this.imgRepository.create(createImageDto));
    await this.personRepository.save(person);
    return `This action adds a new image to Person with id:${entityId}.`;
  }

  async findAll() {
    return await findAllEntities(this.imgRepository);
  }

  async findOne(id: number) {
    return await findOneEntity(id, this.imgRepository);
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    return await updateEntity(id, this.imgRepository, updateImageDto);
  }

  async remove(id: number) {
    return await removeEntity(id, this.imgRepository);
  }
}

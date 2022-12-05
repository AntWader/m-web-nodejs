import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from '../../dto/create-image.dto';
import { UpdateImageDto } from '../../dto/update-image.dto';
import { Image } from '../../entities/image.entity';
import { Person } from '../../entities/person.entity';
import { createEntity, removeEntity, repositoryType, updateEntity } from '../repository.service.exports';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private imgRepository: Repository<Image>,
    @InjectRepository(Person) private personRepository: Repository<Person>,
  ) { }

  async create(createImageDto: CreateImageDto) {
    return await createEntity(this.imgRepository, createImageDto);

    // let img = this.imgRepository.create(createImageDto);

    // let result = await this.imgRepository.save(img);
    // console.log(result)
    // return `This action adds a new image`;
  }

  async createAndLink(entityId: number, createImageDto: CreateImageDto) {
    // return await updateEntity(entityId, this.personRepository, updatePersonImgDto, [
    //   { repository: this.imgRepository, property: 'images', column: 'src' },
    // ])

    let person = await this.personRepository.findOne({ where: { id: entityId } })

    if (person) {
      person.images.push(this.imgRepository.create(createImageDto))
      await this.personRepository.save(person);
      return `This action adds a new image to Person with id:${entityId}.`;
    } else throw new BadRequestException(`Person with id:${entityId} not found.`)
  }

  async findAll() {
    return await this.imgRepository.find();
  }

  async findOne(id: number) {
    return await this.imgRepository.find({ where: { id: id } });
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    return await updateEntity(id, this.imgRepository, updateImageDto);

    // let img = await this.imgRepository
    //   .createQueryBuilder('images')
    //   .where({ id: id })
    //   .getOne()

    // if (img) {
    //   await this.imgRepository.save(replaceProperties(img, updateImageDto));
    //   return `This action updates a #${id} image`;
    // } else throw new BadRequestException(`Person with id:${id} not found.`);
  }

  async remove(id: number) {
    return await removeEntity(id, this.imgRepository);

    // let img = await this.imgRepository
    //   .createQueryBuilder('images')
    //   .where({ id: id })
    //   .getOne()

    // if (img) {
    //   await this.imgRepository.remove(img);
    //   return `This action removes a #${id} image`;
    // } else throw new BadRequestException(`Person with id:${id} not found.`);
  }
}

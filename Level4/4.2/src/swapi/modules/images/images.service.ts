import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from '../../dto/create-image.dto';
import { UpdateImageDto } from '../../dto/update-image.dto';
import { Images } from '../../entities/image.entity';
import { Person } from '../../entities/person.entity';
import { replaceProperties } from '../people/people.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Images) private imgRepository: Repository<Images>,
    @InjectRepository(Person) private personRepository: Repository<Person>,
  ) { }

  async create(createImageDto: CreateImageDto) {
    let img = this.imgRepository.create(createImageDto);

    let result = await this.imgRepository.save(img);
    console.log(result)
    return `This action adds a new image`;
  }

  async createAndLink(entityId: number, createImageDto: CreateImageDto) {
    let person = await this.personRepository
      .createQueryBuilder('person')
      .leftJoinAndSelect('person.images', 'images')
      .getOne()

    //console.log(person)

    if (person) {
      person.images.push(this.imgRepository.create(createImageDto))
      await this.personRepository.save(person);
      return `This action adds a new image to person id:${entityId}`;
    } else throw new BadRequestException(`Person with id:${entityId} not found.`)
  }

  findAll() {
    let found = this.imgRepository.find();
    return found;

    //return `This action returns all images`;
  }

  findOne(id: number) {
    let found = this.imgRepository.find({ where: { id: id } });
    return found;

    //return `This action returns a #${id} image`;
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    let img = await this.imgRepository
      .createQueryBuilder('images')
      .where({ id: id })
      .getOne()

    if (img) {
      await this.imgRepository.save(replaceProperties(img, updateImageDto));
      return `This action updates a #${id} image`;
    } else throw new BadRequestException(`Person with id:${id} not found.`);
  }

  async remove(id: number) {
    let img = await this.imgRepository
      .createQueryBuilder('images')
      .where({ id: id })
      .getOne()

    if (img) {
      await this.imgRepository.remove(img);
      return `This action removes a #${id} image`;
    } else throw new BadRequestException(`Person with id:${id} not found.`);
  }
}

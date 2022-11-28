import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from '../../dto/create-person.dto';
import { UpdatePersonDto } from '../../dto/update-person.dto';
import { Person } from '../../entities/person.entity';
import { Gender } from '../../entities/gender.entity';
import { Images } from '../../entities/image.entity';

/**
 * Removes properties from object.
 * 
 * @param dto object with properties to remove
 * @param prop properties list to remove from object
 * @returns object without selected properties
 */
export function filterProperty(dto: Object, prop: string[]) {

  const filtered = Object.keys(dto)
    .filter(key => !prop.includes(key))
    .reduce((obj, key) => {
      //@ts-ignore
      obj[key] = dto[key];
      return obj;
    }, {});

  return filtered;
}

/**
 * Finds first match entity instance or create new.
 * 
 * @param rep Repository which is supposed to work with entity objects
 * @param findOption conditions by which entity should be queried, example {where:{id:1}}
 * @returns entity instance
 */
export async function findOrCreateRepository(
  rep: Repository<any>,
  findOption: { where: Record<string, any> }
) {
  let findRep: any[] = await rep.find(findOption);
  let newRep: any;

  if (findRep.length < 1) {
    newRep = rep.create(findOption.where);
  } else {
    newRep = findRep[0];
  }

  return newRep;
}

/**
 * Replaces relation entities objects by first non id property value within it.
 * 
 * @param obj entity object
 * @returns entity object with entity values replaced by entity first column (except id) value.
 */
function flatten(obj: object) {
  let flatObj: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      flatObj[key as keyof object] = value.map(val => val.id ? getEntityValue(val) : val);
    } else if (value.id) {
      flatObj[key as keyof object] = getEntityValue(value);
    } else flatObj[key as keyof object] = value;
  }

  return flatObj;
}

/**
 * Returns first non id property value.
 * 
 * @param entity entity instance object
 * @returns entity column value
 */
function getEntityValue(entity: object): any {
  for (const [key, value] of Object.entries(entity)) {
    if (key !== 'id') return value;
  }
}

export function updateEntity(entity: Record<string, any>, updateDto: Record<string, any>) {
  let updateKeys = Object.keys(updateDto);

  for (const [key, value] of Object.entries(entity)) {
    if (updateKeys.includes(key)) {
      entity[key] = updateDto[key];
    }
  }

  return entity;
}

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
    @InjectRepository(Gender) private genderRepository: Repository<Gender>,
    @InjectRepository(Images) private imgRepository: Repository<Images>,
  ) { }

  async create(createPersonDto: CreatePersonDto) {
    let savePerson: Partial<Person> = filterProperty(createPersonDto, ['gender']);

    savePerson.gender = await findOrCreateRepository(
      this.genderRepository,
      { where: { gender: createPersonDto.gender } })

    let person = this.personRepository.create(savePerson)
    await this.personRepository.save(person);

    return 'This action adds a new person';
  }

  async findAll() {
    let people = await this.personRepository
      .createQueryBuilder('person')
      .leftJoinAndSelect('person.gender', 'gender')
      .leftJoinAndSelect('person.images', 'images')
      .getMany()

    return people.map(person => flatten(person));
  }

  async findOne(id: number) {
    let person = await this.personRepository
      .createQueryBuilder('person')
      .leftJoinAndSelect('person.gender', 'gender')
      .leftJoinAndSelect('person.images', 'images')
      .where({ id: id })
      .getOne()

    if (person) {
      return flatten(person);
    } else throw new BadRequestException(`Person with id:${id} not found.`);
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    let updatePerson: Partial<Person> = filterProperty(updatePersonDto, ['gender']);

    let person = await this.personRepository
      .createQueryBuilder('person')
      .leftJoinAndSelect('person.gender', 'gender')
      .leftJoinAndSelect('person.images', 'images')
      .where({ id: id })
      .getOne()

    if (person) {
      if (updatePersonDto.gender) {
        updatePerson.gender = await findOrCreateRepository(
          this.genderRepository,
          { where: { gender: updatePersonDto.gender } })
      }

      await this.personRepository.save(updateEntity(person, updatePerson));

      return `This action updates a #${id} person`;
    } else throw new BadRequestException(`Person with id:${id} not found.`);
  }

  async remove(id: number) {

    let person = await this.personRepository
      .createQueryBuilder('person')
      .leftJoinAndSelect('person.gender', 'gender')
      .leftJoinAndSelect('person.images', 'images')
      .where({ id: id })
      .getOne()

    if (person) {
      await this.personRepository.remove(person)

      return `This action removes a #${id} person`;
    } else throw new BadRequestException(`Person with id:${id} not found.`);
  }
}

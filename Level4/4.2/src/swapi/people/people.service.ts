import { Injectable, Logger, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntity, EntitySchema, ObjectLiteral, Repository } from 'typeorm';
import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { Person } from '../entities/person.entity';
import { Gender } from '../entities/gender.entity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

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
    if (value.id) {
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

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
    @InjectRepository(Gender) private genderRepository: Repository<Gender>,
  ) { }

  async create(createPersonDto: CreatePersonDto) {
    let savePersonDto: Partial<Person> = filterProperty(createPersonDto, ['gender']);

    savePersonDto.gender = await findOrCreateRepository(
      this.genderRepository,
      { where: { gender: createPersonDto.gender } })

    let person = this.personRepository.create(savePersonDto)
    await this.personRepository.save(person);

    return 'This action adds a new person';
  }

  async findAll() {
    let found = this.personRepository
      .createQueryBuilder('person')
      .leftJoinAndSelect('person.gender', 'gender')
      .getMany()

    let people = await found;

    return people.map(person => flatten(person));
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from '../../dto/create-person.dto';
import { UpdatePersonDto } from '../../dto/update-person.dto';
import { Person } from '../../entities/person.entity';
import { Gender } from '../../entities/gender.entity';
import { Images } from '../../entities/image.entity';
import { Film } from 'src/swapi/entities/film.entity';

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
 * If find option defined as {id:number} and entity was not found, throws BadRequestException!
 * 
 * @param rep Repository which is supposed to work with entity objects
 * @param findOption conditions by which entity should be queried, example {where:{id:1}}
 * @returns entity instance
 */
export async function findOrCreateRepository(
  rep: repositoryType,
  findOption: { where: entityType }
) {
  let findRep: any = await rep.findOne(findOption);

  if (findRep) {
    return findRep
  } else {
    if (findOption.where.id) throw new BadRequestException(`${rep.target} with id:${findOption.where.id} not found.`);

    return rep.create(findOption.where);
  }
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

export function replaceProperties(entity: Record<string, any>, updateDto: Record<string, any>) {
  let updateKeys = Object.keys(updateDto);

  for (const [key, value] of Object.entries(entity)) {
    if (updateKeys.includes(key)) {
      entity[key] = updateDto[key];
    }
  }

  return entity;
}

type entityType = Record<string, any>;
type repositoryType = Repository<entityType>;

async function fillRelationsDto(
  dto: entityType,
  relations: { repository: repositoryType, property: string, column: string }[],
) {

  let newObj: entityType = {};
  for (let i = 0; i < relations.length; i++) {
    let repository = relations[i].repository;
    let propertyValue = dto[relations[i].property];

    if (propertyValue) {
      // search entity by id or by column value
      let search = (entityValue: any) => entityValue.id ? { id: entityValue.id } : { [relations[i].column]: entityValue };

      if (Array.isArray(propertyValue)) {
        newObj[relations[i].property] = [];
        for (let j = 0; j < propertyValue.length; j++) {
          console.log('hello \#3')
          let findEntity = await findOrCreateRepository(repository, { where: search(propertyValue[j]) });
          newObj[relations[i].property].push(findEntity);
        }
      } else {
        console.log('hello \#4')
        newObj[relations[i].property] = await findOrCreateRepository(repository, { where: search(propertyValue) });
      }
    }
  }

  return newObj;
}

async function createEntity(
  entityRepository: repositoryType,
  dto: entityType,
  relations?: { repository: repositoryType, property: string, column: string }[],
) {
  let entityProperties: Partial<entityType>;
  let relationsProperties: Partial<entityType>;

  if (relations) {
    entityProperties = filterProperty(dto, relations.map(relation => relation.property));
    relationsProperties = await fillRelationsDto(dto, relations);
  } else {
    entityProperties = dto;
    relationsProperties = {};
  }

  let entity = entityRepository.create({ ...entityProperties, ...relationsProperties })
  await entityRepository.save(entity);

  return `This action adds a new ${entityRepository.target}`;
}

async function updateEntity(
  entityId: number,
  entityRepository: repositoryType,
  dto: entityType,
  relations?: { repository: repositoryType, property: string, column: string }[],
) {
  let entity = await entityRepository.findOne({ where: { id: entityId } });
  let updateProperties: Partial<entityType>;
  let updateRelations: Partial<entityType>;

  if (relations) {
    updateProperties = filterProperty(dto, relations.map(relation => relation.property));
    console.log('hello')
    updateRelations = await fillRelationsDto(dto, relations);//!!!!!!!!!!!!!
    console.log('hello \#2')
  } else {
    updateProperties = dto;
    updateRelations = {};
  }

  if (entity) {
    await entityRepository.save(replaceProperties(entity, { ...updateProperties, ...updateRelations }));

    return `This action adds a new ${entityRepository.target}`;
  } else throw new BadRequestException(`Person with id:${entityId} not found.`);
}

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
    @InjectRepository(Gender) private genderRepository: Repository<Gender>,
    @InjectRepository(Film) private filmRepository: Repository<Film>,
    @InjectRepository(Images) private imgRepository: Repository<Images>,
  ) { }

  async create(createPersonDto: CreatePersonDto) {
    return await createEntity(
      this.personRepository,
      createPersonDto,
      [
        { repository: this.genderRepository, property: 'gender', column: 'gender' },
        { repository: this.filmRepository, property: 'films', column: 'film' },
      ]);

    // let savePerson: Partial<Person> = filterProperty(createPersonDto, ['gender']);

    // savePerson.gender = await findOrCreateRepository(
    //   this.genderRepository,
    //   { where: { gender: createPersonDto.gender } })

    // let person = this.personRepository.create(savePerson)
    // await this.personRepository.save(person);

    // return 'This action adds a new person';
  }

  async findAll() {
    let people = await this.personRepository.find();

    // let people = await this.personRepository
    //   .createQueryBuilder('person')
    //   .leftJoinAndSelect('person.gender', 'gender')
    //   .leftJoinAndSelect('person.images', 'images')
    //   .getMany()

    // return people.map(person => flatten(person));
    return people;
  }

  async findOne(id: number) {
    let person = await this.personRepository.findOne({ where: { id: id } });

    // let person = await this.personRepository
    //   .createQueryBuilder('person')
    //   .leftJoinAndSelect('person.gender', 'gender')
    //   .leftJoinAndSelect('person.images', 'images')
    //   .where({ id: id })
    //   .getOne()

    if (person) {
      // return flatten(person);
      return person;
    } else throw new BadRequestException(`Person with id:${id} not found.`);
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    return await updateEntity(
      id,
      this.personRepository,
      updatePersonDto,
      [
        { repository: this.genderRepository, property: 'gender', column: 'gender' },
        { repository: this.filmRepository, property: 'films', column: 'film' },
        { repository: this.imgRepository, property: 'images', column: 'src' },
      ]);

    // let updatePerson: Partial<Person> = filterProperty(updatePersonDto, ['gender']);

    // let person = await this.personRepository.findOne({ where: { id: id } });

    // if (person) {
    //   if (updatePersonDto.gender) {
    //     updatePerson.gender = await findOrCreateRepository(
    //       this.genderRepository,
    //       { where: { gender: updatePersonDto.gender } })
    //   }

    //   await this.personRepository.save(replaceProperties(person, updatePerson));

    //   return `This action updates a #${id} person`;
    // } else throw new BadRequestException(`Person with id:${id} not found.`);
  }

  async remove(id: number) {

    let person = await this.personRepository.findOne({ where: { id: id } });

    if (person) {
      await this.personRepository.remove(person)

      return `This action removes a #${id} person`;
    } else throw new BadRequestException(`Person with id:${id} not found.`);
  }
}

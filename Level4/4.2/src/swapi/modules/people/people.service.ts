import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from '../../dto/create-person.dto';
import { UpdatePersonDto } from '../../dto/update-person.dto';
import { Person } from '../../entities/person.entity';
import { Gender } from '../../entities/gender.entity';
import { Image } from '../../entities/image.entity';
import { Film } from 'src/swapi/entities/film.entity';
import { createEntity, entityType, relationType, removeEntity, repositoryType, updateEntity } from '../repository.service.exports';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';
import { Planet } from 'src/swapi/entities/planet.entity';
import { Species } from 'src/swapi/entities/species.entity';
import { Vehicle } from 'src/swapi/entities/vehicle.entity';
import { Starship } from 'src/swapi/entities/starship.entity';

/**
 * Replaces relation entities objects by first non id property value within it.
 * 
 * @param obj entity object
 * @returns entity object with entity values replaced by entity first column (except id) value.
 */
function flatten(obj: object, relationsConfig: relationType[]) {
  let flatObj: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value) { // in case: value = null
      if (Array.isArray(value)) {
        flatObj[key as keyof object] = value.map(val => getEntityColumn(key, val, relationsConfig));
      } else {
        flatObj[key as keyof object] = getEntityColumn(key, value, relationsConfig);
      }
    } else {
      flatObj[key as keyof object] = value;
    }
  }

  return flatObj;
}

function getEntityColumn(key: string, value: any | entityType, relationsConfig: relationType[]) {
  for (const relation of relationsConfig) {
    if (key === relation.property) {
      return value[relation.column];
    }
  }

  return value;
}

function getRelationColumn(entity: entityType, columnName: string) { }

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

let peopleRelationsConfig: relationType[];

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
    @InjectRepository(Image) private imgRepository: Repository<Image>,
    @InjectRepository(Gender) private genderRepository: Repository<Gender>,
    @InjectRepository(Planet) private planetRepository: Repository<Planet>,
    @InjectRepository(Film) private filmRepository: Repository<Film>,
    @InjectRepository(Species) private speciesRepository: Repository<Species>,
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Starship) private starshipRepository: Repository<Starship>,
  ) {
    peopleRelationsConfig = [
      { repository: this.genderRepository, property: 'gender', column: 'gender', create: true },
      { repository: this.imgRepository, property: 'images', column: 'src' },
      { repository: this.planetRepository, property: 'homeworld', column: 'url', nullable: true },
      { repository: this.filmRepository, property: 'films', column: 'url', nullable: true },
      { repository: this.speciesRepository, property: 'species', column: 'url', nullable: true },
      { repository: this.vehicleRepository, property: 'vehicles', column: 'url', nullable: true },
      { repository: this.starshipRepository, property: 'starships', column: 'url', nullable: true },
    ]
  }

  async create(createPersonDto: CreatePersonDto) {
    return await createEntity(this.personRepository, createPersonDto, peopleRelationsConfig);
  }

  async findAll() {
    let people = await this.personRepository.find({
      relations: peopleRelationsConfig.map(rel => rel.property)
    });

    return people;
  }

  getPage(query: PaginateQuery) {
    return paginate(query, this.personRepository, {
      sortableColumns: ['id', 'name',],
      nullSort: 'last',
      searchableColumns: ['name',],
      defaultSortBy: [['id', 'DESC']],
      defaultLimit: 10,
    })
  }

  async findOne(id: number) {
    let person = await this.personRepository.findOne({
      where: { id: id },
      relations: peopleRelationsConfig.map(rel => rel.property)
    });

    if (person) {
      // return person;
      return flatten(person, peopleRelationsConfig);
    } else throw new BadRequestException(`Person with id:${id} not found.`);
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    return await updateEntity(id, this.personRepository, updatePersonDto, peopleRelationsConfig);
  }

  async remove(id: number) {
    return await removeEntity(id, this.personRepository);
  }
}

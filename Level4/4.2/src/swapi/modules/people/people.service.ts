import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from '../../dto/create-person.dto';
import { UpdatePersonDto } from '../../dto/update-person.dto';
import { Person } from '../../entities/person.entity';
import { Gender } from '../../entities/gender.entity';
import { Image } from '../../entities/image.entity';
import { Film } from '../../../swapi/entities/film.entity';
import { createEntity, findAllEntities, findOneEntity, flatten, relationType, removeEntity, updateEntity } from '../repository.service.exports';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { Planet } from '../../../swapi/entities/planet.entity';
import { Species } from '../../../swapi/entities/species.entity';
import { Vehicle } from '../../../swapi/entities/vehicle.entity';
import { Starship } from '../../../swapi/entities/starship.entity';
import { personPaginateConfig } from './person.paginate.config';

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
    return await findAllEntities(this.personRepository, peopleRelationsConfig);
  }

  getPage(query: PaginateQuery) {
    return paginate(query, this.personRepository, personPaginateConfig);
  }

  async findOne(id: number) {
    return await findOneEntity(id, this.personRepository, peopleRelationsConfig);
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    return await updateEntity(id, this.personRepository, updatePersonDto, peopleRelationsConfig);
  }

  async remove(id: number) {
    return await removeEntity(id, this.personRepository);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../../../swapi/entities/film.entity';
import { Person } from '../../../swapi/entities/person.entity';
import { Planet } from '../../../swapi/entities/planet.entity';
import { Species } from '../../../swapi/entities/species.entity';
import { Starship } from '../../../swapi/entities/starship.entity';
import { Vehicle } from '../../../swapi/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { CreateFilmDto } from '../../dto/create-film.dto';
import { UpdateFilmDto } from '../../dto/update-film.dto';
import { createEntity, findAllEntities, findOneEntity, relationType, removeEntity, updateEntity } from '../repository.service.exports';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { filmPaginateConfig } from './films.paginate.config';

let filmRelationsConfig: relationType[];

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
    @InjectRepository(Person) private personRepository: Repository<Person>,
    @InjectRepository(Planet) private planetRepository: Repository<Planet>,
    @InjectRepository(Starship) private starshipRepository: Repository<Starship>,
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Species) private speciesRepository: Repository<Species>,
  ) {
    filmRelationsConfig = [
      { repository: this.personRepository, property: 'characters', column: 'url', nullable: true },
      { repository: this.planetRepository, property: 'planets', column: 'url', nullable: true },
      { repository: this.starshipRepository, property: 'starships', column: 'url', nullable: true },
      { repository: this.vehicleRepository, property: 'vehicles', column: 'url', nullable: true },
      { repository: this.speciesRepository, property: 'species', column: 'url', nullable: true },
    ]
  }

  async create(createFilmDto: CreateFilmDto) {
    return await createEntity(this.filmRepository, createFilmDto, filmRelationsConfig);
  }

  async findAll() {
    return await findAllEntities(this.filmRepository, filmRelationsConfig);
  }

  getPage(query: PaginateQuery) {
    return paginate(query, this.filmRepository, filmPaginateConfig);
  }

  async findOne(id: number) {
    return await findOneEntity(id, this.filmRepository, filmRelationsConfig);
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    return await updateEntity(id, this.filmRepository, updateFilmDto, filmRelationsConfig);
  }

  async remove(id: number) {
    return await removeEntity(id, this.filmRepository);
  }
}

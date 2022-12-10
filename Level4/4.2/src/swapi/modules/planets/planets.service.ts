import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/swapi/entities/film.entity';
import { Person } from 'src/swapi/entities/person.entity';
import { Planet } from 'src/swapi/entities/planet.entity';
import { Species } from 'src/swapi/entities/species.entity';
import { Repository } from 'typeorm';
import { CreatePlanetDto } from '../../dto/create-planet.dto';
import { UpdatePlanetDto } from '../../dto/update-planet.dto';
import { createEntity, findAllEntities, findOneEntity, relationType, removeEntity, updateEntity } from '../repository.service.exports';

let planetRelationsConfig: relationType[];

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet) private planetRepository: Repository<Planet>,
    @InjectRepository(Species) private speciesRepository: Repository<Species>,
    @InjectRepository(Person) private personRepository: Repository<Person>,
    @InjectRepository(Film) private filmRepository: Repository<Film>,
  ) {
    planetRelationsConfig = [
      { repository: this.speciesRepository, property: 'species', column: 'url', nullable: true },
      { repository: this.personRepository, property: 'residents', column: 'url', nullable: true },
      { repository: this.filmRepository, property: 'films', column: 'url', nullable: true },
    ]
  }

  async create(createPlanetDto: CreatePlanetDto) {
    return await createEntity(this.planetRepository, createPlanetDto, planetRelationsConfig);
  }

  async findAll() {
    return await findAllEntities(this.planetRepository, planetRelationsConfig);
  }

  async findOne(id: number) {
    return await findOneEntity(id, this.planetRepository, planetRelationsConfig);
  }

  async update(id: number, updatePlanetDto: UpdatePlanetDto) {
    return await updateEntity(id, this.planetRepository, updatePlanetDto, planetRelationsConfig);
  }

  async remove(id: number) {
    return await removeEntity(id, this.planetRepository);
  }
}

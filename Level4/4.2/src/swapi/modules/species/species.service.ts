import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/swapi/entities/film.entity';
import { Person } from 'src/swapi/entities/person.entity';
import { Planet } from 'src/swapi/entities/planet.entity';
import { Species } from 'src/swapi/entities/species.entity';
import { Repository } from 'typeorm';
import { CreateSpeciesDto } from '../../dto/create-species.dto';
import { UpdateSpeciesDto } from '../../dto/update-species.dto';
import { createEntity, findAllEntities, findOneEntity, relationType, removeEntity, updateEntity } from '../repository.service.exports';

let speciesRelationsConfig: relationType[];

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species) private speciesRepository: Repository<Species>,
    @InjectRepository(Planet) private planetRepository: Repository<Planet>,
    @InjectRepository(Person) private personRepository: Repository<Person>,
    @InjectRepository(Film) private filmRepository: Repository<Film>,
  ) {
    speciesRelationsConfig = [
      { repository: this.planetRepository, property: 'homeworld', column: 'url', nullable: true },
      { repository: this.personRepository, property: 'people', column: 'url', nullable: true },
      { repository: this.filmRepository, property: 'films', column: 'url', nullable: true },
    ]
  }

  async create(createSpeciesDto: CreateSpeciesDto) {
    return await createEntity(this.speciesRepository, createSpeciesDto, speciesRelationsConfig);
  }

  async findAll() {
    return await findAllEntities(this.speciesRepository, speciesRelationsConfig);
  }

  async findOne(id: number) {
    return await findOneEntity(id, this.speciesRepository, speciesRelationsConfig);
  }

  async update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
    return await updateEntity(id, this.speciesRepository, updateSpeciesDto, speciesRelationsConfig);
  }

  async remove(id: number) {
    return await removeEntity(id, this.speciesRepository);
  }
}

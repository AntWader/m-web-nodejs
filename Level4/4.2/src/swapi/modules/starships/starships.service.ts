import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../../../swapi/entities/film.entity';
import { Person } from '../../../swapi/entities/person.entity';
import { Starship } from '../../../swapi/entities/starship.entity';
import { Repository } from 'typeorm';
import { CreateStarshipDto } from '../../dto/create-starship.dto';
import { UpdateStarshipDto } from '../../dto/update-starship.dto';
import { createEntity, findAllEntities, findOneEntity, relationType, removeEntity, updateEntity } from '../repository.service.exports';
import { starshipPaginateConfig } from './starships.paginate.config';
import { PaginateQuery, paginate } from 'nestjs-paginate';

let starshipRelationsConfig: relationType[];

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starship) private starshipRepository: Repository<Starship>,
    @InjectRepository(Person) private personRepository: Repository<Person>,
    @InjectRepository(Film) private filmRepository: Repository<Film>,
  ) {
    starshipRelationsConfig = [
      { repository: this.personRepository, property: 'pilots', column: 'url', nullable: true },
      { repository: this.filmRepository, property: 'films', column: 'url', nullable: true },
    ]
  }

  async create(createStarshipDto: CreateStarshipDto) {
    return await createEntity(this.starshipRepository, createStarshipDto, starshipRelationsConfig);
  }

  async findAll() {
    return await findAllEntities(this.starshipRepository, starshipRelationsConfig);
  }

  getPage(query: PaginateQuery) {
    return paginate(query, this.starshipRepository, starshipPaginateConfig);
  }

  async findOne(id: number) {
    return await findOneEntity(id, this.starshipRepository, starshipRelationsConfig);
  }

  async update(id: number, updateStarshipDto: UpdateStarshipDto) {
    return await updateEntity(id, this.starshipRepository, updateStarshipDto, starshipRelationsConfig);
  }

  async remove(id: number) {
    return await removeEntity(id, this.starshipRepository);
  }
}

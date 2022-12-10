import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/swapi/entities/film.entity';
import { Person } from 'src/swapi/entities/person.entity';
import { Vehicle } from 'src/swapi/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from '../../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../../dto/update-vehicle.dto';
import { createEntity, findAllEntities, findOneEntity, relationType, removeEntity, updateEntity } from '../repository.service.exports';

let vehiclesRelationsConfig: relationType[];

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Person) private personRepository: Repository<Person>,
    @InjectRepository(Film) private filmRepository: Repository<Film>,
  ) {
    vehiclesRelationsConfig = [
      { repository: this.personRepository, property: 'pilots', column: 'url', nullable: true },
      { repository: this.filmRepository, property: 'films', column: 'url', nullable: true },
    ]
  }

  async create(createVehicleDto: CreateVehicleDto) {
    return await createEntity(this.vehicleRepository, createVehicleDto, vehiclesRelationsConfig);
  }

  async findAll() {
    return await findAllEntities(this.vehicleRepository, vehiclesRelationsConfig);
  }

  async findOne(id: number) {
    return await findOneEntity(id, this.vehicleRepository, vehiclesRelationsConfig);
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return await updateEntity(id, this.vehicleRepository, updateVehicleDto, vehiclesRelationsConfig);
  }

  async remove(id: number) {
    return await removeEntity(id, this.vehicleRepository);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) { }

  async create(createPersonDto: CreatePersonDto) {
    let person = this.personRepository.create(createPersonDto)
    await this.personRepository.save(person);

    return 'This action adds a new person';
  }

  findAll() {
    let found = this.personRepository.find();
    //return `This action returns all people`;
    return found;
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

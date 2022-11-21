import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from '../entities/person.entity';
import { Gender } from '../entities/gender.entity';

function filterProperty(dto: Object, prop: string[]) {

  const filtered = Object.keys(dto)
    .filter(key => !prop.includes(key))
    .reduce((obj, key) => {
      //@ts-ignore
      obj[key] = dto[key];
      return obj;
    }, {});

  return filtered;
}

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
  ) { }

  async create(createPersonDto: CreatePersonDto) {
    let savePersonDto: Partial<Person> = filterProperty(createPersonDto, ['gender']);

    let newGender = new Gender();
    newGender.gender = createPersonDto.gender;

    savePersonDto.gender = newGender

    let person = this.personRepository.create(savePersonDto)
    await this.personRepository.save(person);

    return 'This action adds a new person';
  }

  findAll() {
    let found = this.personRepository.find();
    //return `This action returns all people.module`;
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

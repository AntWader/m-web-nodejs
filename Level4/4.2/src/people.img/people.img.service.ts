import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePeopleImgDto } from './dto/create-people.img.dto';
import { UpdatePeopleImgDto } from './dto/update-people.img.dto';
import { PersonImg } from './entities/people.img.entity';

@Injectable()
export class PeopleImgService {
  constructor(
    @InjectRepository(PersonImg)
    private personImgRepository: Repository<PersonImg>,
  ) { }

  async create(createPeopleImgDto: CreatePeopleImgDto) {
    let person = this.personImgRepository.create(createPeopleImgDto)
    await this.personImgRepository.save(person);

    return 'This action adds a new peopleImg';
  }

  findAll() {
    let found = this.personImgRepository.find();
    //return `This action returns all peopleImg`;
    return found;
  }

  findOne(id: number) {
    return `This action returns a #${id} peopleImg`;
  }

  update(id: number, updatePeopleImgDto: UpdatePeopleImgDto) {
    return `This action updates a #${id} peopleImg`;
  }

  remove(id: number) {
    return `This action removes a #${id} peopleImg`;
  }
}

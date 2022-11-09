import { PartialType } from '@nestjs/swagger';
import { CreatePeopleImgDto } from './create-people.img.dto';

export class UpdatePeopleImgDto extends PartialType(CreatePeopleImgDto) {}

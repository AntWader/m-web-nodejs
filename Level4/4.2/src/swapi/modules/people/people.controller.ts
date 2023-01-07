import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from '../../dto/create-person.dto';
import { UpdatePersonDto } from '../../dto/update-person.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { ApiQuery } from '@nestjs/swagger';
import { Roles } from '../../../auth/roles/roles.decorator';
import { RolesGuard } from '../../../auth/roles/roles.guard';

@UseGuards(RolesGuard)
@Roles('admin')
@Controller()
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  @Get()
  @Roles('user')
  findAll() {
    return this.peopleService.findAll();
  }

  @ApiQuery({
    name: "page",
    description: "Page number",
    required: false,
    type: Number
  })
  @Get()
  @Roles('user')
  getPage(@Paginate() query: PaginateQuery) {
    return this.peopleService.getPage(query)
  }

  @Get(':id')
  @Roles('user')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.remove(id);
  }
}

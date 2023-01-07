import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { GendersService } from './genders.service';
import { CreateGenderDto } from '../../dto/create-gender.dto';
import { UpdateGenderDto } from '../../dto/update-gender.dto';
import { RolesGuard } from '../../../auth/roles/roles.guard';
import { Roles } from '../../../auth/roles/roles.decorator';
import { ApiQuery } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@UseGuards(RolesGuard)
@Roles('admin')
@Controller()
export class GendersController {
  constructor(private readonly gendersService: GendersService) { }

  @Post()
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.gendersService.create(createGenderDto);
  }

  @Get()
  @Roles('user')
  findAll() {
    return this.gendersService.findAll();
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
    return this.gendersService.getPage(query)
  }

  @Get(':id')
  @Roles('user')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gendersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGenderDto: UpdateGenderDto) {
    return this.gendersService.update(id, updateGenderDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gendersService.remove(id);
  }
}

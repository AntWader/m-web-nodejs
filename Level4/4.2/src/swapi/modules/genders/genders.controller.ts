import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { GendersService } from './genders.service';
import { CreateGenderDto } from '../../dto/create-gender.dto';
import { UpdateGenderDto } from '../../dto/update-gender.dto';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

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

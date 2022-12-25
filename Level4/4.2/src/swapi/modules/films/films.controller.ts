import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from '../../dto/create-film.dto';
import { UpdateFilmDto } from '../../dto/update-film.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@UseGuards(RolesGuard)
@Roles('admin')
@Controller()
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) { }

  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  @Roles('user')
  findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id')
  @Roles('user')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.update(id, updateFilmDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.remove(id);
  }
}

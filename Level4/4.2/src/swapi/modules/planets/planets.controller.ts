import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from '../../dto/create-planet.dto';
import { UpdatePlanetDto } from '../../dto/update-planet.dto';
import { RolesGuard } from '../../../auth/roles/roles.guard';
import { Roles } from '../../../auth/roles/roles.decorator';
import { ApiQuery } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@UseGuards(RolesGuard)
@Roles('admin')
@Controller()
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) { }

  @Post()
  create(@Body() createPlanetDto: CreatePlanetDto) {
    return this.planetsService.create(createPlanetDto);
  }

  @Get()
  @Roles('user')
  findAll() {
    return this.planetsService.findAll();
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
    return this.planetsService.getPage(query)
  }

  @Get(':id')
  @Roles('user')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.planetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePlanetDto: UpdatePlanetDto) {
    return this.planetsService.update(id, updatePlanetDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.planetsService.remove(id);
  }
}

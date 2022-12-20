import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from '../../dto/create-planet.dto';
import { UpdatePlanetDto } from '../../dto/update-planet.dto';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

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

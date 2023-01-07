import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from '../../dto/create-species.dto';
import { UpdateSpeciesDto } from '../../dto/update-species.dto';
import { Roles } from '../../../auth/roles/roles.decorator';
import { RolesGuard } from '../../../auth/roles/roles.guard';
import { ApiQuery } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@UseGuards(RolesGuard)
@Roles('admin')
@Controller()
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) { }

  @Post()
  create(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.create(createSpeciesDto);
  }

  @Get()
  @Roles('user')
  findAll() {
    return this.speciesService.findAll();
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
    return this.speciesService.getPage(query)
  }

  @Get(':id')
  @Roles('user')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.speciesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSpeciesDto: UpdateSpeciesDto) {
    return this.speciesService.update(id, updateSpeciesDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.speciesService.remove(id);
  }
}

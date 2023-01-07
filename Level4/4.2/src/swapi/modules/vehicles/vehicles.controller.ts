import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from '../../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../../dto/update-vehicle.dto';
import { RolesGuard } from '../../../auth/roles/roles.guard';
import { Roles } from '../../../auth/roles/roles.decorator';
import { ApiQuery } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@UseGuards(RolesGuard)
@Roles('admin')
@Controller()
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) { }

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  @Roles('user')
  findAll() {
    return this.vehiclesService.findAll();
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
    return this.vehiclesService.getPage(query)
  }

  @Get(':id')
  @Roles('user')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from '../../dto/create-starship.dto';
import { UpdateStarshipDto } from '../../dto/update-starship.dto';
import { RolesGuard } from '../../../auth/roles/roles.guard';
import { Roles } from '../../../auth/roles/roles.decorator';
import { ApiQuery } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@UseGuards(RolesGuard)
@Roles('admin')
@Controller()
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) { }

  @Post()
  create(@Body() createStarshipDto: CreateStarshipDto) {
    return this.starshipsService.create(createStarshipDto);
  }

  @Get()
  @Roles('user')
  findAll() {
    return this.starshipsService.findAll();
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
    return this.starshipsService.getPage(query)
  }

  @Get(':id')
  @Roles('user')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.starshipsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateStarshipDto: UpdateStarshipDto) {
    return this.starshipsService.update(+id, updateStarshipDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.starshipsService.remove(+id);
  }
}

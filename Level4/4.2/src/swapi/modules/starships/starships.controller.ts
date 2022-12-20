import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from '../../dto/create-starship.dto';
import { UpdateStarshipDto } from '../../dto/update-starship.dto';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

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

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UniversityService } from './university.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) { }

  @Post()
  create(@Body() createUniversityDto: CreateUniversityDto) {
    return this.universityService.create(createUniversityDto);
  }

  @Get()
  findAll() {
    return this.universityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.universityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUniversityDto: UpdateUniversityDto,
  ) {
    return this.universityService.update(+id, updateUniversityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.universityService.remove(+id);
  }
}

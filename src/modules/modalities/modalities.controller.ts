import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModalitiesService } from './modalities.service';
import { CreateModalityDto } from './dto/create-modality.dto';
import { UpdateModalityDto } from './dto/update-modality.dto';

@Controller('modalities')
export class ModalitiesController {
  constructor(private readonly modalitiesService: ModalitiesService) {}

  @Post()
  create(@Body() createModalityDto: CreateModalityDto) {
    return this.modalitiesService.create(createModalityDto);
  }

  @Get()
  findAll() {
    return this.modalitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modalitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModalityDto: UpdateModalityDto) {
    return this.modalitiesService.update(+id, updateModalityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modalitiesService.remove(+id);
  }
}

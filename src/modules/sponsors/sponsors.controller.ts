import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SponsorsService } from './sponsors.service';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '@shared/config/multer.config';


@ApiTags('sponsors')
@Controller('sponsors')
@ApiResponse({ status: 201, description: 'El patrocinador ha sido creado exitosamente.' })
@ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
@ApiResponse({ status: 500, description: 'Error interno del servidor.' })
export class SponsorsController {
  constructor(private readonly sponsorsService: SponsorsService) { }


  @UseInterceptors(FileInterceptor('image', multerOptions))
  @Post()
  create(@Body() createSponsorDto: CreateSponsorDto, @UploadedFile() image: Express.Multer.File) {
    return this.sponsorsService.create(createSponsorDto, image);
  }

  @Get()
  findAll() {
    return this.sponsorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sponsorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSponsorDto: UpdateSponsorDto) {
    return this.sponsorsService.update(+id, updateSponsorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sponsorsService.remove(+id);
  }
}

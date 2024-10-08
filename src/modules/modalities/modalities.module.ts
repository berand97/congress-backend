import { Module } from '@nestjs/common';
import { ModalitiesService } from './modalities.service';
import { ModalitiesController } from './modalities.controller';
import { Modality } from './entities/modality.entity';
import { DescriptionItem } from './entities/description.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Modality, DescriptionItem])],
  controllers: [ModalitiesController],
  providers: [ModalitiesService],
})
export class ModalitiesModule { }

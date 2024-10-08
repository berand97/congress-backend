import { Injectable } from '@nestjs/common';
import { CreateModalityDto } from './dto/create-modality.dto';
import { UpdateModalityDto } from './dto/update-modality.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modality } from './entities/modality.entity';
import { DescriptionItem } from './entities/description.entity';

@Injectable()
export class ModalitiesService {
  constructor(
    @InjectRepository(Modality)
    private readonly modalityRepository: Repository<Modality>,
    @InjectRepository(DescriptionItem)
    private readonly descriptionItemRepository: Repository<DescriptionItem>,
  ) { }

  async create(createModalityDto: CreateModalityDto): Promise<{ message: string, modality: Modality }> {
    const modality = this.modalityRepository.create({
      name: createModalityDto.name,
      price: createModalityDto.price,
      status: createModalityDto.status,
      url: createModalityDto.url,
    });

    const savedModality = await this.modalityRepository.save(modality);

    const descriptionItems = createModalityDto.descriptionItems.map(item => {
      const descriptionItem = this.descriptionItemRepository.create({
        text: item.text,
        modality: savedModality,
      });
      return descriptionItem;
    });

    await this.descriptionItemRepository.save(descriptionItems);

    savedModality.descriptionItems = descriptionItems;

    return {
      message: 'Modality created successfully',
      modality: savedModality,
    };
  }

  async findAll() {
    const modalities = await this.modalityRepository.find({
      relations: ['descriptionItems'],
    });
    return {
      message: 'Modalities fetched successfully',
      modalities: modalities,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} modality`;
  }

  update(id: number, updateModalityDto: UpdateModalityDto) {
    return `This action updates a #${id} modality`;
  }

  remove(id: number) {
    return `This action removes a #${id} modality`;
  }
}

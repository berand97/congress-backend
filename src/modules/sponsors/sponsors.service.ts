import { Injectable } from '@nestjs/common';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sponsor } from './entities/sponsor.entity';

@Injectable()
export class SponsorsService {
  constructor(
    @InjectRepository(Sponsor)
    private sponsorsRepository: Repository<Sponsor>,
  ) { }

  async create(createSponsorDto: CreateSponsorDto, image: Express.Multer.File): Promise<Sponsor> {
    const sponsor = this.sponsorsRepository.create({
      ...createSponsorDto,
      image: image.filename,
    });
    return this.sponsorsRepository.save(sponsor);
  }

  async findAll() {
    const sponsors = await this.sponsorsRepository.find({
      order: {
        order: 'ASC',
      },
    });
    return {
      message: 'Sponsors fetched successfully',
      sponsors,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} sponsor`;
  }

  update(id: number, updateSponsorDto: UpdateSponsorDto) {
    return `This action updates a #${id} sponsor`;
  }

  remove(id: number) {
    return `This action removes a #${id} sponsor`;
  }
}

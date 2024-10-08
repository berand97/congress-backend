import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { University } from './entities/university.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
  ) { }

  async create(createUniversityDto: CreateUniversityDto) {
    const { name } = createUniversityDto;
    const existingUniversity = await this.universityRepository.findOne({ where: { name } });
    if (existingUniversity) {
      throw new ConflictException('University already exists');
    }
    const university = this.universityRepository.create({ name });
    await this.universityRepository.save(university);
    return {
      message: 'University created successfully',
      university
    };
  }

  findAll() {
    return `This action returns all university`;
  }

  findOne(id: number) {
    return `This action returns a #${id} university`;
  }

  update(id: number, updateUniversityDto: UpdateUniversityDto) {
    return `This action updates a #${id} university`;
  }

  remove(id: number) {
    return `This action removes a #${id} university`;
  }
}

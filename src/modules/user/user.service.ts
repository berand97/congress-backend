import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '@modules/roles/entities/role.entity';
import { University } from '@modules/university/entities/university.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@shared/config/config.service';
import { Authentication } from '@modules/authentication/entities/authentication.entity';

@Injectable()
export class UserService {
  constructor(
    private config: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
    @InjectRepository(Authentication)
    private readonly authenticationRepository: Repository<Authentication>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { name, last_name, email, password, role, university } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const roleEntity = await this.roleRepository.findOne({ where: { id: role } });
    if (!roleEntity) {
      throw new NotFoundException('Role not found');
    }

    const universityEntity = await this.universityRepository.findOne({ where: { id: university } });
    if (!universityEntity) {
      throw new NotFoundException('University not found');
    }

    const saltRounds = Number(this.config.get('SALT'));
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      name,
      last_name,
      email,
      password: hashedPassword,
      role: roleEntity,
      university: universityEntity
    });
    await this.userRepository.save(user);

    const authentication = this.authenticationRepository.create({
      email: user.email,
      password: hashedPassword
    });
    await this.authenticationRepository.save(authentication);

    return {
      message: 'User created successfully',
      user
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

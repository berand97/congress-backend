import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    const { role, description } = createRoleDto;
    const roleExists = await this.roleRepository.findOne({ where: { role } });
    if (roleExists) {
      throw new ConflictException('Role already exists');
    }
    const newRole = this.roleRepository.create({ role, description });
    await this.roleRepository.save(newRole);

    return {
      message: 'Role created successfully',
      role: newRole,
    };
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}

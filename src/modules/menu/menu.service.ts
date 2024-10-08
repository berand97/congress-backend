import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { Role } from '@modules/roles/entities/role.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  async create(createMenuDto: CreateMenuDto) {
    const { submenus, roles, ...menuData } = createMenuDto;

    const existingMenu = await this.menuRepository.findOne({ where: { path: menuData.path } });
    if (existingMenu) {
      throw new HttpException('Menu with this path already exists', HttpStatus.BAD_REQUEST);
    }

    const menu = this.menuRepository.create(menuData as DeepPartial<Menu>);

    if (roles && roles.length > 0) {
      const foundRoles = await this.roleRepository.findByIds(roles);
      menu.roles = foundRoles;
    }

    const savedMenu = await this.menuRepository.save(menu);

    if (submenus && submenus.length > 0) {
      for (const submenuDto of submenus) {
        const submenu = this.menuRepository.create({
          name: submenuDto.name,
          path: submenuDto.path,
          icon: submenuDto.icon,
          parent: savedMenu,
        });

        if (submenuDto.roles && submenuDto.roles.length > 0) {
          const foundRoles = await this.roleRepository.findByIds(submenuDto.roles);
          submenu.roles = foundRoles;
        }

        await this.menuRepository.save(submenu);
      }
    }

    return {
      message: 'Menu created successfully',
      menu: savedMenu
    };
  }

  findAll() {
    return `This action returns all menu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { In, Repository } from 'typeorm';
import { Authentication } from './entities/authentication.entity';
import * as bcrypt from 'bcrypt';
import { Tokens } from './interfaces/token.interface';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { join } from 'path';
import { ConfigService } from '@shared/config/config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/user/entities/user.entity';
import { Role } from '@modules/roles/entities/role.entity';
import { Menu } from '@modules/menu/entities/menu.entity';

@Injectable()
export class AuthenticationService {
  public payload: Authentication = new Authentication();

  constructor(
    private config: ConfigService,
    @InjectRepository(Authentication) private readonly authRepository: Repository<Authentication>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  ) { }

  async login(createAuthenticationDto: CreateAuthenticationDto): Promise<Tokens> {
    const user = await this.validateUser(createAuthenticationDto);
    this.payload = user;
    const tokens = this.createTokens();
    await this.updateRefreshToken(user.email, tokens.refreshToken);
    const menus = await this.getMenusByUserRole(user.role.id);
    return this.buildResponse(tokens, menus);
  }

  private async validateUser({ email, password }: CreateAuthenticationDto): Promise<User> {
    const user = await this.findUserByEmail(email);
    if (!this.verifyPassword(password, user.password)) {
      throw new HttpException('User and/or password not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  private async updateRefreshToken(email: string, refreshToken: string): Promise<void> {
    await this.authRepository.update({ email }, { refreshToken });
  }

  private async getMenusByUserRole(roleId: string): Promise<Menu[]> {
    const role = await this.findRoleById(roleId);
    return this.findMenusByRoleId(role.id);
  }

  private async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email }, relations: ['role', 'university'] });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  private verifyPassword(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }

  private buildResponse(tokens: Tokens, menus: Menu[]): Tokens {
    return { ...tokens, menu: menus };
  }

  private async findRoleById(roleId: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    return role;
  }

  private async findMenusByRoleId(roleId: string): Promise<Menu[]> {
    const menus = await this.menuRepository.find({ where: { roles: { id: roleId } }, relations: ['submenus', 'parent'] });
    if (!menus) throw new HttpException('Menus not found', HttpStatus.NOT_FOUND);
    return this.buildMenuHierarchy(menus);
  }

  private buildMenuHierarchy(menus: Menu[]): Menu[] {
    const menuMap = new Map<string, Menu>();
    menus.forEach(menu => menuMap.set(menu.uid, { ...menu, submenus: [] }));

    const menuHierarchy: Menu[] = [];
    menuMap.forEach(menu => {
      if (menu.parent) {
        const parentMenu = menuMap.get(menu.parent.uid);
        if (parentMenu) parentMenu.submenus.push(menu);
      } else {
        menuHierarchy.push(menu);
      }
    });


    menuHierarchy.forEach(menu => {
      menu.submenus.forEach(submenu => {
        if (submenu.submenus.length === 0) {
          delete submenu.parent;
          delete submenu.submenus;
        }
        if (submenu.icon === null) {
          delete submenu.icon;
        }
      });
    });


    menuHierarchy.forEach(menu => {
      if (menu.parent === null) {
        delete menu.parent;
      }
    });

    return menuHierarchy;
  }

  public createTokens(): Tokens {
    const { password, ...user } = this.payload;
    const token = this.signToken(user, this.config.get('JWT_PVT_KEY'), '60m');
    const refreshToken = this.signToken(user, this.config.get('JWT_REFRESH_PVT_KEY'), '90m');
    return {
      token,
      refreshToken,
      expiresIn: 60000 * 60,
      refreshExpiresIn: 60000 * 90,
    };
  }

  private signToken(user: any, key: string, expiresIn: string): string {
    return jwt.sign({ data: user }, fs.readFileSync(join(process.cwd(), key)).toString(), {
      algorithm: 'RS256',
      expiresIn,
    });
  }


}
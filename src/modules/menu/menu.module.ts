import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Role } from '@role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Role])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule { }

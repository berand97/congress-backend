import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '@role/entities/role.entity';
import { University } from '@university/entities/university.entity';
import { ConfigModule } from 'src/config/config.module';
import { Authentication } from '@modules/authentication/entities/authentication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, University, Authentication]), ConfigModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }

import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authentication } from './entities/authentication.entity';
import { ConfigModule } from 'src/config/config.module';
import { JwtStrategy } from '@strategies/jwt.strategy';
import { JwtRefreshStrategy } from '@strategies/jwt-refresh.strategy';
import { User } from '@user/entities/user.entity';
import { Role } from '@role/entities/role.entity';
import { Menu } from '@menu/entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Authentication, User, Role, Menu]), ConfigModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, JwtRefreshStrategy],
})
export class AuthenticationModule { }

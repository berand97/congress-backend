import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
@ApiTags('auth')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 404, description: 'Not Found.' })
@ApiResponse({ status: 500, description: 'Internal Error Server.' })
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post()
  async create(@Body() createAuthenticationDto: CreateAuthenticationDto, @Res() response: Response): Promise<void> {
    const tokens = await this.authenticationService.login(createAuthenticationDto);

    response.cookie('__g-token', tokens.token, {
      maxAge: tokens.expiresIn,
      httpOnly: true,
    });
    response.cookie('__g-refresh', tokens.refreshToken, {
      maxAge: tokens.refreshExpiresIn,
      httpOnly: true,
    });
    response.status(HttpStatus.OK).send({
      isLogging: true,
      message: 'User authenticated successfully',
      menu: tokens.menu
    });
  }
  @Get()
  findAll() {
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthenticationDto: UpdateAuthenticationDto,
  ) {
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  }
}

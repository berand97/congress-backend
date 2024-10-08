import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { join } from 'path';
import * as fs from 'fs';

import { JwtPayload } from '@shared/interfaces/jwt-payload.interface';
import { Authentication } from 'src/modules/authentication/entities/authentication.entity';
import { AuthenticationService } from 'src/modules/authentication/authentication.service';
import { ConfigService } from '@shared/config/config.service';

/**
 * JwtRefreshStrategy for the authentication of the API.
 *
 * @export
 * @class JwtRefreshStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  /**
   * Creates an instance of JwtRefreshStrategy.
   *
   * @param {ConfigService} config
   * @param {AuthService} authService
   * @memberof JwtRefreshStrategy
   */
  public constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthenticationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtRefreshStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: fs
        .readFileSync(join(process.cwd(), config.get('JWT_REFRESH_PVT_KEY')))
        .toString(),
      passReqToCallback: true,
    });
  }

  /**
   * Validate the decrypted payload.
   *
   * @param {Request} req
   * @param {JwtPayload<AuthEntity>} payload
   * @returns {Promise<JwtPayload<AuthEntity>>}
   * @memberof JwtRefreshStrategy
   */
  public async validate(
    req: Request,
    payload: JwtPayload<Authentication>,
  ): Promise<JwtPayload<Authentication>> {
    const refreshToken = req.cookies['__g-refresh'];

    return { ...payload, refreshToken };
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && '__g-refresh' in req.cookies) {
      return req.cookies['__g-refresh'];
    }

    return null;
  }
}

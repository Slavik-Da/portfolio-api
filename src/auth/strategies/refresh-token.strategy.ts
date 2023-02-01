import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { type Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getBearerTokenFromHeaders } from './libs/getBearerTokenFromHeaders';
import { type JwtPayload } from '../../common/types';

interface ValidateReturn extends JwtPayload {
  refreshToken: string;
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('refresh-token'),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET_KEY'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): ValidateReturn {
    const refreshToken = getBearerTokenFromHeaders(req);
    return {
      ...payload,
      refreshToken,
    };
  }
}

import {
  Headers,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromHeader: ExtractJwt.fromAuthHeaderAsBearerToken,
    });
  }
  async validate(@Headers('Authentication') idToken: string) {
    try {
    } catch (error) {
      if (error.code === 'auth/id-token-expired')
        throw new UnauthorizedException('Id Token expired');
      else throw new InternalServerErrorException();
    }
  }
}

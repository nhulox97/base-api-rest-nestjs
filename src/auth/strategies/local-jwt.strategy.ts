import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { plainToModel } from '../../utils/plain-to-model.utils';
import { GuestTokenDto } from '../dto/guest-token.dto';
import { UserTokenDto } from '../dto/user-token.dto';

@Injectable()
export class LocalJwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_AUTH_SECRET,
    });
  }

  async validate(payload: any): Promise<UserTokenDto | GuestTokenDto> {
    if (payload?.roles?.length) return plainToModel(UserTokenDto, payload);

    return plainToModel(GuestTokenDto, payload);
  }
}

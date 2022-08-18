import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // 토큰 유효성 체크
  constructor() {
    super({
      secretOrKey: jwtConstants.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // payload에 저장된 email이 데이터베이스에 존재하는지 확인 후 유저를 반환
  async validate(payload: any) {
    return { ...payload };
  }
}

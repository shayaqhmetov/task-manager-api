import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { JWTPayload } from './jwt.interface';
import { ERROR_MESSAGE } from '../constants';
import { User } from './entities/user.entity';

export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private readonly authRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: JWTPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.authRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGE.UNAUTHORIZED);
    }

    return user;
  }
}

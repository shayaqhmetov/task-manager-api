import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthProvider {
  constructor(
    @InjectRepository(UserRepository) private authRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * Create new user
   * @param userCredetials {UserCredentialsDto}
   * @returns {Promise<User>}
   */
  public signUp(userCredetials: UserCredentialsDto): Promise<User> {
    return this.authRepository.createUser(userCredetials);
  }

  /**
   * Validate user credentials
   * @param userCredetials {UserCredentialsDto}
   * @returns {Promise<User>}
   */
  public async signIn(
    userCredetials: UserCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const payload = await this.authRepository.validateUser(userCredetials);
    return { accessToken: this.jwtService.sign(payload) };
  }
}

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions/';

import { CustomRepository } from '../database/typeorm-ex.decorator';
import { User } from './entities/user.entity';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { ERROR_MESSAGE } from 'src/constants';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * Create new user
   * @param userCredetials {UserCredentialsDto}
   * @returns {Promise<User>}
   */
  async createUser(userCredetials: UserCredentialsDto): Promise<User> {
    const { username, password } = userCredetials;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const user: User = this.create({
        username,
        password: hashedPassword,
      });
      return await this.save(user);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(ERROR_MESSAGE.USER_EXISTS(username));
      } else {
        throw new InternalServerErrorException(err.message);
      }
    }
  }

  /**
   * Get user by username
   * @param username {string}
   * @returns {Promise<User>}
   */
  async getUserByUsername(username: string): Promise<User> {
    const user = await this.findOne({
      where: { username },
    });
    if (!user)
      throw new NotFoundException(ERROR_MESSAGE.USER_NOT_FOUND(username));
    return user;
  }

  /**
   * Validate user credentials
   * @param userCredetials {UserCredentialsDto}
   * @returns {Promise<User>}
   */
  async validateUser(userCredetials: UserCredentialsDto): Promise<{
    username: string;
  }> {
    const { username, password } = userCredetials;
    const user: User = await this.getUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return { username: user.username };
    } else {
      throw new BadRequestException(ERROR_MESSAGE.INVALID_CREDENTIALS);
    }
  }
}

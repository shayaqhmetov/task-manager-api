import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthProvider } from './auth.provider';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authProvider: AuthProvider) {}

  @Post('/signup')
  public signUp(@Body() userCredetials: UserCredentialsDto): Promise<User> {
    return this.authProvider.signUp(userCredetials);
  }

  @Post('/signin')
  public signIn(
    @Body() userCredetials: UserCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authProvider.signIn(userCredetials);
  }
}

import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ERROR_MESSAGE } from 'src/constants';

export class UserCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: ERROR_MESSAGE.PASSWORD_IS_WEAK,
  })
  password: string;
}

import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { normalizeEmail } from '@common/transformers/normalize-email';
import { PASSWORD_MAX_LENGTH, PASSWORD_STRENGTH_MESSAGE, PASSWORD_STRENGTH_OPTIONS } from '@common/constants/password';
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from '@common/constants/username';

export class UserCreateDto {
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @MinLength(USERNAME_MIN_LENGTH, { message: `Username must be at least ${USERNAME_MIN_LENGTH} characters` })
  @MaxLength(USERNAME_MAX_LENGTH, { message: `Username must be at most ${USERNAME_MAX_LENGTH} characters` })
  username: string;

  @Transform(normalizeEmail)
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MaxLength(PASSWORD_MAX_LENGTH, { message: 'Password is too long' })
  @IsStrongPassword(PASSWORD_STRENGTH_OPTIONS, { message: PASSWORD_STRENGTH_MESSAGE })
  password: string;
}

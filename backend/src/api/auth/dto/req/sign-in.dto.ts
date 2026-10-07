import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { normalizeEmail } from '@common/transformers/normalize-email';
import { PASSWORD_MAX_LENGTH } from '@common/constants/password';

export class SignInDto {
  @Transform(normalizeEmail)
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MaxLength(PASSWORD_MAX_LENGTH, { message: 'Password is too long' })
  password: string;
}

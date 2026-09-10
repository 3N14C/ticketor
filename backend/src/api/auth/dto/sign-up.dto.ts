import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignUpDto {
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username cannot be empty' })
  username: string;

  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsStrongPassword(
    { minLength: 8, minSymbols: 1, minLowercase: 1, minNumbers: 1 },
    { message: 'Password must be at least 8 characters' },
  )
  password: string;
}
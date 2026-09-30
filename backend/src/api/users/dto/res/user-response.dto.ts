import { Exclude } from 'class-transformer';

export class UserResponseDto {
  id: string;
  username: string;
  email: string;

  @Exclude()
  password: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

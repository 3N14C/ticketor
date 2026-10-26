import { CreateUserCommand } from './create-user.command';
import { User } from '../../../domain/entities/user.entity';
import { PasswordHasherPort } from '../../ports/password-hasher.port';
import { UsersCommandsPort } from '../../ports/users-commands.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserHandler {
  constructor(
    private readonly userCommandsPort: UsersCommandsPort,
    private readonly passwordHasherPort: PasswordHasherPort,
  ) {}

  async execute(input: CreateUserCommand): Promise<User> {
    const passwordHash = await this.passwordHasherPort.hash(input.password);
    return this.userCommandsPort.create({
      name: input.name,
      email: input.email,
      passwordHash,
    });
  }
}
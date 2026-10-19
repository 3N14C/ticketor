import { UserRepositoryPort } from '../ports/user-repository.port';
import { User } from '../../domain/entities/user.entity';
import { PasswordHasherPort } from '../ports/password-hasher.port';
import { Injectable } from '@nestjs/common';
import { UserAlreadyExistsError } from '../../domain/errors/user.error';

interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly passwordHasherPort: PasswordHasherPort,
  ) {}

  async execute(user: CreateUserInput): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(user.email);

    if (existingUser) throw new UserAlreadyExistsError();

    const passwordHash = await this.passwordHasherPort.hash(user.password);

    return this.userRepository.create({
      email: user.email,
      name: user.name,
      passwordHash,
    });
  }
}
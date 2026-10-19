import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../ports/user-repository.port';
import { User } from '../../domain/entities/user.entity';
import { UserNotFoundError } from '../../domain/errors/user.error';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new UserNotFoundError();

    return user;
  }
}
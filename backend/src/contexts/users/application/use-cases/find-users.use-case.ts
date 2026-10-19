import { UserRepositoryPort } from '../ports/user-repository.port';
import { User } from '../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUsersUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
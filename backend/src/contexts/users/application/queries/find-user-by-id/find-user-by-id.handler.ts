import { Injectable } from '@nestjs/common';
import { UsersQueriesPort } from '../../ports/users-queries.port';
import { User } from '../../../domain/entities/user.entity';
import { FindUserByIdQuery } from './find-user-by-id.query';
import { InvalidTokenError } from '../../../../auth/domain/errors/invalid-token.error';

@Injectable()
export class FindUserByIdHandler {
  constructor(private readonly usersQueriesPort: UsersQueriesPort) {}

  async execute({ userId }: FindUserByIdQuery): Promise<User> {
    const user = await this.usersQueriesPort.findById(userId);

    if (!user) throw new InvalidTokenError();

    return user;
  }
}
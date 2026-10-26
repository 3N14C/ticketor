import { Injectable } from '@nestjs/common';
import { UsersQueriesPort } from '../../ports/users-queries.port';
import { User } from '../../../domain/entities/user.entity';
import { FindUserByEmailQuery } from './find-user-by-email.query';
import { UserNotFoundError } from '../../../domain/errors/user-not-found.error';

@Injectable()
export class FindUserByEmailHandler {
  constructor(private readonly usersQueriesPort: UsersQueriesPort) {}

  async execute({ email }: FindUserByEmailQuery): Promise<User> {
    const user = await this.usersQueriesPort.findByEmail(email);

    if (!user) throw new UserNotFoundError();

    return user;
  }
}
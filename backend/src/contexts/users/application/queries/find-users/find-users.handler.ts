import { Injectable } from '@nestjs/common';
import { UsersQueriesPort } from '../../ports/users-queries.port';
import { User } from '../../../domain/entities/user.entity';
import { FindUsersQuery } from './find-users.query';

@Injectable()
export class FindUsersHandler {
  constructor(private readonly usersQueriesPort: UsersQueriesPort) {}

  execute(query?: FindUsersQuery): Promise<User[]> {
    return this.usersQueriesPort.findAll(query);
  }
}
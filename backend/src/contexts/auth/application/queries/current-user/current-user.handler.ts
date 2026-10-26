import { Injectable } from '@nestjs/common';
import { AuthUser, UsersGatewayPort } from '../../ports/users-gateway.port';
import { CurrentUserQuery } from './current-user.query';
import { InvalidTokenError } from '../../../domain/errors/invalid-token.error';

@Injectable()
export class CurrentUserHandler {
  constructor(private readonly usersGatewayPort: UsersGatewayPort) {}

  async execute({ userId }: CurrentUserQuery): Promise<AuthUser> {
    const user = await this.usersGatewayPort.findById(userId);

    if (!user) throw new InvalidTokenError('User not found');

    return user;
  }
}
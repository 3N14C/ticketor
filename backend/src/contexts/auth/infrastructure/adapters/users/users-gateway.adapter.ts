import { Injectable } from '@nestjs/common';
import {
  AuthUser,
  SignUpInput,
  UsersGatewayPort,
  VerifyCredentialsInput,
} from '../../../application/ports/users-gateway.port';
import { CreateUserHandler } from '@contexts/users/application/commands/create-user/create-user.handler';
import { VerifyCredentialsHandler } from '@contexts/users/application/queries/verify-credentials/verify-credentials.handler';
import { FindUserByIdHandler } from '@contexts/users/application/queries/find-user-by-id/find-user-by-id.handler';
import { User } from '@contexts/users/domain/entities/user.entity';
import { CreateUserCommand } from '@contexts/users/application/commands/create-user/create-user.command';
import { VerifyCredentialsQuery } from '@contexts/users/application/queries/verify-credentials/verify-credentials.query';
import { FindUserByIdQuery } from '@contexts/users/application/queries/find-user-by-id/find-user-by-id.query';
import { UserNotFoundError } from '@contexts/users/domain/errors/user-not-found.error';

const toAuthUser = ({ id, email, name }: User): AuthUser => ({
  id,
  email,
  name,
});

@Injectable()
export class UsersGatewayAdapter implements UsersGatewayPort {
  constructor(
    private readonly createUser: CreateUserHandler,
    private readonly verifyCredentialsHandler: VerifyCredentialsHandler,
    private readonly findUserById: FindUserByIdHandler,
  ) {}

  async signUp(input: SignUpInput): Promise<AuthUser> {
    return toAuthUser(await this.createUser.execute(new CreateUserCommand(input.name, input.email, input.password)));
  }

  async verifyCredentials(input: VerifyCredentialsInput): Promise<AuthUser | null> {
    const user = await this.verifyCredentialsHandler.execute(new VerifyCredentialsQuery(input.email, input.password));

    return user && toAuthUser(user);
  }

  async findById(userId: string): Promise<AuthUser | null> {
    try {
      return toAuthUser(await this.findUserById.execute(new FindUserByIdQuery(userId)));
    } catch (error) {
      if (error instanceof UserNotFoundError) return null;
      throw error;
    }
  }
}
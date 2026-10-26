import { Injectable } from '@nestjs/common';
import { UsersGatewayPort } from '../../ports/users-gateway.port';
import { TokenPair, TokensServicePort } from '../../ports/tokens-service.port';
import { InvalidCredentialsError } from '../../../domain/errors/invalid-credentials.error';
import { SignInCommand } from './sign-in.command';

@Injectable()
export class SignInHandler {
  constructor(
    private readonly usersGatewayPort: UsersGatewayPort,
    private readonly tokensServicePort: TokensServicePort,
  ) {}

  async execute(input: SignInCommand): Promise<TokenPair> {
    const user = await this.usersGatewayPort.verifyCredentials(input);

    if (!user) throw new InvalidCredentialsError();

    return this.tokensServicePort.issuePair({ sub: user.id, email: user.email });
  }
}
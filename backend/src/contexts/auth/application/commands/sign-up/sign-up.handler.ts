import { Injectable } from '@nestjs/common';
import { UsersGatewayPort } from '../../ports/users-gateway.port';
import { TokenPair, TokensServicePort } from '../../ports/tokens-service.port';
import { SignUpCommand } from './sign-up.command';

@Injectable()
export class SignUpHandler {
  constructor(
    private readonly usersGatewayPort: UsersGatewayPort,
    private readonly tokensServicePort: TokensServicePort,
  ) {}

  async execute(input: SignUpCommand): Promise<TokenPair> {
    const user = await this.usersGatewayPort.signUp(input);

    return this.tokensServicePort.issuePair({ sub: user.id, email: user.email });
  }
}
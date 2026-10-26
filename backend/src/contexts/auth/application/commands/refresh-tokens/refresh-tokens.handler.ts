import { TokenPair, TokensServicePort } from '../../ports/tokens-service.port';
import { TokensDenylistPort } from '../../ports/tokens-denylist.port';
import { UsersGatewayPort } from '../../ports/users-gateway.port';
import { RefreshTokensCommand } from './refresh-tokens.command';
import { InvalidTokenError } from '../../../domain/errors/invalid-token.error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokensHandler {
  constructor(
    private readonly tokensServicePort: TokensServicePort,
    private readonly denylistPort: TokensDenylistPort,
    private readonly usersGatewayPort: UsersGatewayPort,
  ) {}

  async execute({ refreshToken }: RefreshTokensCommand): Promise<TokenPair> {
    if (!refreshToken) throw new InvalidTokenError('Token is missing');

    const payload = await this.tokensServicePort.verifyRefresh(refreshToken);

    const isClaimed = await this.denylistPort.revokeOnce(payload.jti, payload.exp);

    if (!isClaimed) throw new InvalidTokenError('Token revoked');

    const user = await this.usersGatewayPort.findById(payload.sub);

    if (!user) throw new InvalidTokenError('User not found');

    return this.tokensServicePort.issuePair({ sub: user.id, email: user.email });
  }
}
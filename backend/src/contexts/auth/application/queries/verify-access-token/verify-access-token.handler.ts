import { Injectable } from '@nestjs/common';
import { TokensServicePort, VerifiedTokenPayload } from '../../ports/tokens-service.port';
import { TokensDenylistPort } from '../../ports/tokens-denylist.port';
import { VerifyAccessTokenQuery } from './verify-access-token.query';
import { InvalidTokenError } from '../../../domain/errors/invalid-token.error';

@Injectable()
export class VerifyAccessTokenHandler {
  constructor(
    private readonly tokensServicePort: TokensServicePort,
    private readonly denylistPort: TokensDenylistPort,
  ) {}

  async execute({ token }: VerifyAccessTokenQuery): Promise<VerifiedTokenPayload> {
    if (!token) throw new InvalidTokenError('Token is missing');

    const payload = await this.tokensServicePort.verifyAccess(token);

    if (await this.denylistPort.isRevoked(payload.jti)) throw new InvalidTokenError('Token revoked');

    return payload;
  }
}
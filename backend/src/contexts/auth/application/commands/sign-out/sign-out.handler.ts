import { TokensServicePort, VerifiedTokenPayload } from '../../ports/tokens-service.port';
import { TokensDenylistPort } from '../../ports/tokens-denylist.port';
import { SignOutCommand } from './sign-out.command';
import { InvalidTokenError } from '../../../domain/errors/invalid-token.error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignOutHandler {
  constructor(
    private readonly tokensServicePort: TokensServicePort,
    private readonly denylistPort: TokensDenylistPort,
  ) {}

  async execute(input: SignOutCommand): Promise<void> {
    await this.denylistPort.revoke(input.accessPayload.jti, input.accessPayload.exp);

    if (!input.refreshToken) return;

    let payload: VerifiedTokenPayload;

    try {
      payload = await this.tokensServicePort.verifyRefresh(input.refreshToken);
    } catch (error) {
      if (error instanceof InvalidTokenError) return;
      throw error;
    }

    await this.denylistPort.revoke(payload.jti, payload.exp);
  }
}
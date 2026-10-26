import { VerifiedTokenPayload } from '../../ports/tokens-service.port';

export class SignOutCommand {
  constructor(
    readonly accessPayload: VerifiedTokenPayload,
    readonly refreshToken: string | undefined,
  ) {}
}
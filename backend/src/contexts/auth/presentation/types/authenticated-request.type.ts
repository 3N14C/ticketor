import { VerifiedTokenPayload } from '../../application/ports/tokens-service.port';
import { type Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: VerifiedTokenPayload;
}
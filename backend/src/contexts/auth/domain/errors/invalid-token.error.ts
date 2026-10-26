import { DomainError } from '@shared/domain/errors/domain.error';

export class InvalidTokenError extends DomainError {
  constructor(message: string = 'Invalid token') {
    super(message, 'unauthorized');
  }
}
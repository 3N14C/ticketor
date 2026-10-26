import { DomainError } from '@shared/domain/errors/domain.error';

export class InvalidCredentialsError extends DomainError {
  constructor(message: string = 'Invalid credentials') {
    super(message, 'unauthorized');
  }
}
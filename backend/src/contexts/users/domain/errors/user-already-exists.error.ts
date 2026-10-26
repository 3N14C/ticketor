import { DomainError } from '@shared/domain/errors/domain.error';

export class UserAlreadyExistsError extends DomainError {
  constructor(message: string = 'User already exists') {
    super(message, 'conflict');
  }
}
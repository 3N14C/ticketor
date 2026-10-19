import { DomainError } from '@shared/domain/errors/domain.error';

export class UserAlreadyExistsError extends DomainError {
  constructor(message: string = 'User already exists') {
    super(message, 'conflict');
  }
}

export class UserNotFoundError extends DomainError {
  constructor(message: string = 'User not found') {
    super(message, 'not_found');
  }
}
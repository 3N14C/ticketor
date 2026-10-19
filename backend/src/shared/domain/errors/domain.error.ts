export type DomainErrorKind = 'not_found' | 'conflict' | 'invalid';

export class DomainError extends Error {
  constructor(
    message: string,
    readonly kind: DomainErrorKind,
  ) {
    super(message);
  }
}
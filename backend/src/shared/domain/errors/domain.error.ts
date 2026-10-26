export type DomainErrorKind = 'not_found' | 'conflict' | 'invalid' | 'unauthorized';

export class DomainError extends Error {
  constructor(
    message: string,
    readonly kind: DomainErrorKind,
  ) {
    super(message);
  }
}
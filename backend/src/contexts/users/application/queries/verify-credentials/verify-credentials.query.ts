export class VerifyCredentialsQuery {
  constructor(
    readonly email: string,
    readonly password: string,
  ) {}
}
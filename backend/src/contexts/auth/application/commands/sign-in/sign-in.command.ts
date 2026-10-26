export class SignInCommand {
  constructor(
    readonly email: string,
    readonly password: string,
  ) {}
}
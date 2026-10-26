export class CreateUserCommand {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
  ) {}
}
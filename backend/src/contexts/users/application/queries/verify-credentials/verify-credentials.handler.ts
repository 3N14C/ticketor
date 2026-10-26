import { Injectable } from '@nestjs/common';
import { UsersQueriesPort } from '../../ports/users-queries.port';
import { PasswordHasherPort } from '../../ports/password-hasher.port';
import { VerifyCredentialsQuery } from './verify-credentials.query';
import { User } from '../../../domain/entities/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class VerifyCredentialsHandler {
  private dummyHash?: Promise<string>;

  constructor(
    private readonly usersQueriesPort: UsersQueriesPort,
    private readonly passwordHasherPort: PasswordHasherPort,
  ) {}

  async execute(input: VerifyCredentialsQuery): Promise<User | null> {
    const user = await this.usersQueriesPort.findByEmail(input.email);

    const hash = user?.passwordHash ?? (await this.getDummyHash());
    const isValid = await this.passwordHasherPort.verify(input.password, hash);

    return user && isValid ? user : null;
  }

  private getDummyHash(): Promise<string> {
    return (this.dummyHash ??= this.passwordHasherPort.hash(randomUUID()));
  }
}
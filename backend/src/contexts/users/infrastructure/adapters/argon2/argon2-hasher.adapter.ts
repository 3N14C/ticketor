import { PasswordHasherPort } from '../../../application/ports/password-hasher.port';
import argon2 from 'argon2';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Argon2HasherAdapter implements PasswordHasherPort {
  hash(plain: string): Promise<string> {
    return argon2.hash(plain);
  }

  verify(plain: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, plain);
  }
}
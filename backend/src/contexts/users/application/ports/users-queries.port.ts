import { User } from '../../domain/entities/user.entity';

export abstract class UsersQueriesPort {
  abstract findAll(query?: unknown): Promise<User[]>;
  abstract findById(userId: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
}
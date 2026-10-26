import { NewUser, User } from '../../domain/entities/user.entity';

export abstract class UsersCommandsPort {
  abstract create(user: NewUser): Promise<User>;
  abstract deleteById(id: string): Promise<void>;
}
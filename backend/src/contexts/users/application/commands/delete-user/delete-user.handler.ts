import { Injectable } from '@nestjs/common';
import { UsersCommandsPort } from '../../ports/users-commands.port';
import { DeleteUserCommand } from './delete-user.command';

@Injectable()
export class DeleteUserHandler {
  constructor(private readonly userCommandsPort: UsersCommandsPort) {}

  async execute({ id }: DeleteUserCommand): Promise<void> {
    await this.userCommandsPort.deleteById(id);
    return;
  }
}
import {Controller, Get} from '@nestjs/common';
import {UsersService} from './users.service.ts';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return await this.usersService.getAll();
  }
}
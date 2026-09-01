import {Module} from '@nestjs/common';
import {UsersService} from './users.service.ts';
import {UsersController} from './users.controller.ts';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
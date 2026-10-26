import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { toUserResponse, UserResponse, UserResponseSchema } from '../dto/response/user-response.dto';
import { type CreateUserRequest, CreateUserRequestSchema } from '../dto/request/create-user-request.dto';
import { z } from 'zod';
import { UserSchema } from '../../../domain/entities/user.entity';
import { FindUsersHandler } from '../../../application/queries/find-users/find-users.handler';
import { FindUserByEmailHandler } from '../../../application/queries/find-user-by-email/find-user-by-email.handler';
import { CreateUserHandler } from '../../../application/commands/create-user/create-user.handler';
import { DeleteUserHandler } from '../../../application/commands/delete-user/delete-user.handler';
import { CreateUserCommand } from '../../../application/commands/create-user/create-user.command';
import { DeleteUserCommand } from '../../../application/commands/delete-user/delete-user.command';
import { FindUserByEmailQuery } from '../../../application/queries/find-user-by-email/find-user-by-email.query';
import { FindUsersQuery } from '../../../application/queries/find-users/find-users.query';
import {
  MessageResponse,
  MessageResponseSchema,
  toMessageResponse,
} from '@shared/presentation/http/dto/message-response.dto';

@ApiTags('users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(
    private readonly findUsersHandler: FindUsersHandler,
    private readonly findUserByEmailHandler: FindUserByEmailHandler,
    private readonly createUserHandler: CreateUserHandler,
    private readonly deleteUserHandler: DeleteUserHandler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create user', description: 'Create user' })
  @ApiCreatedResponse({
    description: 'User created',
    standardSchema: MessageResponseSchema,
  })
  @ApiConflictResponse({
    description: 'User already exists',
  })
  async create(@Body({ schema: CreateUserRequestSchema }) dto: CreateUserRequest): Promise<MessageResponse> {
    await this.createUserHandler.execute(new CreateUserCommand(dto.name, dto.email, dto.password));
    return toMessageResponse('User created');
  }

  @Get()
  @ApiOperation({ summary: 'Find all users', description: 'Get all users' })
  @ApiOkResponse({ description: 'List of users', standardSchema: z.array(UserResponseSchema) })
  async findAll(): Promise<UserResponse[]> {
    const users = await this.findUsersHandler.execute(new FindUsersQuery());
    return users.map(toUserResponse);
  }

  @Get(':email')
  @ApiOperation({ summary: 'Find user by email', description: 'Get user by email' })
  @ApiOkResponse({ description: 'One user', standardSchema: UserResponseSchema })
  @ApiNotFoundResponse({ description: 'User not found' })
  async findByEmail(@Param('email', { schema: UserSchema.shape.email }) email: string): Promise<UserResponse> {
    const user = await this.findUserByEmailHandler.execute(new FindUserByEmailQuery(email));
    return toUserResponse(user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user', description: 'Delete user' })
  @ApiOkResponse({ description: 'Delete user', standardSchema: MessageResponseSchema })
  @ApiNotFoundResponse({ description: 'User not found' })
  async deleteById(@Param('id', { schema: UserSchema.shape.id }) id: string): Promise<MessageResponse> {
    await this.deleteUserHandler.execute(new DeleteUserCommand(id));

    return toMessageResponse('User deleted');
  }
}
import { z } from 'zod';
import { UserSchema } from '../../../../domain/entities/user.entity';

export const CreateUserRequestSchema = z
  .object({
    name: UserSchema.shape.name,
    email: UserSchema.shape.email,
    password: z.string().min(8, { error: 'Password must be at least 8 characters long' }).max(255),
  })
  .meta({ id: 'CreateUserRequest', description: 'Create user request' });

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
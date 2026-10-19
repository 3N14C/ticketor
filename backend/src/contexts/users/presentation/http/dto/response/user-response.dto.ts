import { User, UserSchema } from '../../../../domain/entities/user.entity';
import { z } from 'zod';

export const UserResponseSchema = UserSchema.omit({ updatedAt: true, passwordHash: true })
  .extend({
    createdAt: z.iso.datetime(),
  })
  .meta({ id: 'UserResponse' });

export type UserResponse = z.infer<typeof UserResponseSchema>;

export const toUserResponse = (user: User): UserResponse => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt.toISOString(),
});
import { z } from 'zod';
import { AuthUser } from '../../../../application/ports/users-gateway.port';

export const AuthUserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});

export type AuthUserResponse = z.infer<typeof AuthUserResponseSchema>;

export const toAuthUserResponse = ({ id, email, name }: AuthUser): AuthUserResponse => ({
  id,
  email,
  name,
});
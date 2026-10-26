import { z } from 'zod';

export const MessageResponseSchema = z
  .object({
    message: z.string({ error: 'Message must be a string' }),
  })
  .meta({
    id: 'MessageResponse',
  });

export type MessageResponse = z.infer<typeof MessageResponseSchema>;

export const toMessageResponse = (message: string): MessageResponse => ({
  message,
});
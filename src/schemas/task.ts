import { z } from 'zod';

const statusEnum = z.enum(['TODO', 'IN_PROGRESS', 'DONE']);

export const TaskSchema = z.object({
  title: z.string().max(255, "Title must be 255 characters or less"),
  description: z.string().optional(),
  status: statusEnum.default('TODO'),
  authorId: z.number().int(),
});

export type TaskContents = z.infer<typeof TaskSchema>;

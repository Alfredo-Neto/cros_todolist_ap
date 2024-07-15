import { z } from 'zod';

export const StatusEnum = z.enum(['TODO', 'IN_PROGRESS', 'DONE']);

export const TaskSchema = z.object({
  title: z.string().max(255, "Title must be 255 characters or less"),
  description: z.string().optional(),
  status: StatusEnum.default('TODO'),
});

export const TaskUpdateSchema = z.object({
  title: z.string().max(255, "Title must be 255 characters or less"),
  description: z.string().optional(),
  status: StatusEnum.optional(),
  authorId: z.number().int().optional(),
});

export const TaskStatusSchema = z.object({
  status: z.string().transform((val) => val.toUpperCase()).refine((val) => ['TODO', 'IN_PROGRESS', 'DONE'].includes(val), {
    message: "Invalid status",
  }),
});


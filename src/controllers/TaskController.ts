import { Request, Response } from 'express';
import { ZodError } from "zod";
import { TaskData } from '../interfaces/TaskData';
import taskService from '../services/task';
import { TaskSchema } from '../schemas/task';

export async function create (req: Request, res: Response) {
  try {
    const taskData: TaskData = req.body;

		const validatedTask = TaskSchema.parse(taskData);

    const newTask = await taskService.createTask(validatedTask);
    res.status(201).json(newTask);
  } catch (error) {
    if (error instanceof ZodError) {
			res.status(400).json({ error: 'Invalid data', details: error.errors });
		}
  }
};

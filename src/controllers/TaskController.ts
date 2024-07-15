import { Request, Response } from 'express';
import { ZodError } from "zod";
import { TaskData, TaskUpdateData } from '../interfaces/TaskData';
import taskService from '../services/task';
import { TaskSchema, TaskUpdateSchema, TaskStatusSchema } from '../schemas/task';
import { CustomRequest } from '../auth/auth';


export async function create (req: CustomRequest, res: Response) {
  try {
    const taskData: TaskData = req.body;
		const authorEmail = req?.user?.email;

		const validatedTask = TaskSchema.parse(taskData);

    const newTask = await taskService.createTask(authorEmail, validatedTask);
    res.status(201).json(newTask);
  } catch (error) {
    if (error instanceof ZodError) {
			res.status(400).json({ error: 'Invalid data', details: error.errors });
		}
  }
};

export async function list(req: CustomRequest, res: Response) {
  try {
		let tasks;
    const authorEmail = req?.user?.email;
		if (authorEmail) {
			tasks = await taskService.listTasks(authorEmail);
		}
    res.status(200).json(tasks);
  } catch (error) {
		if (error instanceof ZodError) {
			res.status(400).json({ error: 'Invalid data', details: error.errors });
		}
  }
}

export async function update(req: CustomRequest, res: Response) {
  try {
    const id = parseInt(req.params.id, 10);
    const authorEmail = req?.user?.email;;
    const taskData: TaskUpdateData = TaskUpdateSchema.parse(req.body);
		if (authorEmail) {
			const updatedTask = await taskService.updateTask(id, authorEmail, taskData);
			res.status(200).json(updatedTask);
		}
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Invalid data', details: error.errors });
		}
  }
}

export async function remove(req: CustomRequest, res: Response) {
  try {
    const id = parseInt(req.params.id, 10);
    const authorEmail = req?.user?.email;
		
		if (authorEmail) {
			await taskService.deleteTask(id, authorEmail);
			res.status(204).send();
		}
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Invalid data', details: error.errors });
		}
  }
}

export async function updateStatus(req: CustomRequest, res: Response) {
  try {
    const id = parseInt(req.params.id, 10);
    const authorEmail = req?.user?.email
    const status = req.query.status as string;
    const parsedStatus = TaskStatusSchema.parse({ status: status.toUpperCase() }).status as 'TODO' | 'IN_PROGRESS' | 'DONE';
		if (authorEmail) {
			const updatedTask = await taskService.updateTaskStatus(id, authorEmail, parsedStatus);
			res.status(200).json(updatedTask);
		}
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Invalid data', details: error.errors });
		}
  }
}

export async function filterByStatus(req: CustomRequest, res: Response) {
  try {
    const authorEmail = req?.user?.email
    const status = req.query.status as string;
    const parsedStatus = TaskStatusSchema.parse({ status: status.toUpperCase() }).status as 'TODO' | 'IN_PROGRESS' | 'DONE';
    
		if (authorEmail) {
			const filteredTasks = await taskService.filterByStatus(authorEmail, parsedStatus);
			res.status(200).json(filteredTasks);
		}
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Invalid data', details: error.errors });
		}
  }
}
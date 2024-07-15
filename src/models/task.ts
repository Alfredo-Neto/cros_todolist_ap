import { PrismaClient, Task } from '@prisma/client';
import { TaskData, TaskUpdateData } from '../interfaces/TaskData';
import { findByEmail } from '../models/user'

const prisma = new PrismaClient();

const createTask = async (authorEmail: string | undefined, taskData: TaskData): Promise<Task> => {
	const author = await findByEmail(authorEmail);

	if (!author) {
    throw new Error(`Author with email ${authorEmail} not found`);
  }
	
	const newTask = await prisma.task.create({
    data: {
      ...taskData,
      author: { connect: { id: author.id } },
    },
  });

  return newTask;

};

const listTasks = async (authorEmail: string): Promise<Task[]> => {
	const author = await findByEmail(authorEmail);
	let tasks;
	if (author) {
		tasks = await prisma.task.findMany({
			where: { authorId: author.id },
		});
	}

	return tasks || [];
};

const updateTask = async (id: number, authorEmail: string, taskData: TaskUpdateData): Promise<Task> => {
	const author = await findByEmail(authorEmail);

  if (!author) {
    throw new Error(`Author with email ${authorEmail} not found`);
  }

  return await prisma.task.update({
    where: { id },
    data: {
      ...taskData,
      authorId: author.id,
    },
  });
};


const deleteTask = async (id: number, authorEmail: string): Promise<void> => {
  const author = await prisma.user.findUnique({
    where: { email: authorEmail },
  });

  if (!author) {
    throw new Error(`Author with email ${authorEmail} not found`);
  }

  await prisma.task.delete({
    where: { id },
  });
};


const updateTaskStatus = async (id: number, authorEmail: string, status: 'TODO' | 'IN_PROGRESS' | 'DONE'): Promise<Task> => {
  const author = await prisma.user.findUnique({
    where: { email: authorEmail },
  });

  if (!author) {
    throw new Error(`Author with email ${authorEmail} not found`);
  }

  return await prisma.task.update({
    where: { id, authorId: author.id },
    data: { status },
  });
};

const filterByStatus = async (authorEmail: string, status: 'TODO' | 'IN_PROGRESS' | 'DONE'): Promise<Task[]> => {
  const author = await prisma.user.findUnique({
    where: { email: authorEmail },
  });

  if (!author) {
    throw new Error(`Author with email ${authorEmail} not found`);
  }

  return await prisma.task.findMany({
    where: { authorId: author.id, status },
  });
};


export default {
  createTask,
  listTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
  filterByStatus
};

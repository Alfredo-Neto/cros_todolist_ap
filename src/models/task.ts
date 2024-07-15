import { PrismaClient } from '@prisma/client';
import { TaskData } from '../interfaces/TaskData';

const prisma = new PrismaClient();

const create = async (taskData: TaskData) => {
  return prisma.task.create({
    data: taskData,
  });
};

export default {
  create,
};

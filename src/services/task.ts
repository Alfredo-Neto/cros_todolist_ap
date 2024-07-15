import taskModel from '../models/task';
import { TaskData } from '../interfaces/TaskData';
import userModel from '../models/user';

const createTask = async (taskData: TaskData) => {
	const userExists = await userModel.findById(taskData.authorId);
	if (!userExists) {
		throw new Error('User not found');
	}

	const newTask = await taskModel.create(taskData);
	return newTask;
};

export default {
  createTask,
};

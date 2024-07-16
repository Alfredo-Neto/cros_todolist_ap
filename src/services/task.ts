import taskModel from "../models/task";
import { TaskData, TaskUpdateData, SubtaskData } from "../interfaces/TaskData";

const createTask = async (
  authorEmail: string | undefined,
  taskData: TaskData
) => {
  return await taskModel.createTask(authorEmail, taskData);
};

const createSubtask = async (
  authorEmail: string | undefined,
  subtaskData: SubtaskData
) => {
  return await taskModel.createSubtask(authorEmail, subtaskData);
};

const listTasks = async (authorEmail: string) => {
  return await taskModel.listTasks(authorEmail);
};

const listSubtasks = async (taskId: number, parentSubtaskId: number) => {
  return await taskModel.listSubtasks(taskId, parentSubtaskId);
};

const updateTask = async (
  id: number,
  authorEmail: string,
  taskData: TaskUpdateData
) => {
  return await taskModel.updateTask(id, authorEmail, taskData);
};

const deleteTask = async (id: number, authorEmail: string) => {
  await taskModel.deleteTask(id, authorEmail);
};

const updateTaskStatus = async (
  id: number,
  authorEmail: string,
  status: "TODO" | "IN_PROGRESS" | "DONE"
) => {
  return await taskModel.updateTaskStatus(id, authorEmail, status);
};

const filterByStatus = async (
  authorEmail: string,
  status: "TODO" | "IN_PROGRESS" | "DONE"
) => {
  return await taskModel.filterByStatus(authorEmail, status);
};

export default {
  createTask,
  listTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
  filterByStatus,
  createSubtask,
  listSubtasks
};

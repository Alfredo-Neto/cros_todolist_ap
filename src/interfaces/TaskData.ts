import { Status } from "@prisma/client";
export interface TaskData {
  title: string;
  description?: string;
  status?: Status;
  authorEmail?: string;
}
export interface SubtaskData {
  title: string;
  description?: string;
  status?: Status;
  taskId?: number;
  parentSubtaskId?: number;
}
export interface TaskUpdateData {
  title: string;
  description?: string;
  status?: Status;
  authorId?: number;
}

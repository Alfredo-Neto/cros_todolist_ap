export interface TaskData {
  title: string;
  description?: string;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  authorEmail?: string;
}

export interface TaskUpdateData {
  title: string;
  description?: string;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  authorId?: number;
}

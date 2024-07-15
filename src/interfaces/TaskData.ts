export interface TaskData {
	title: string;
	description?: string;
	status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
	authorId: number;
}
  
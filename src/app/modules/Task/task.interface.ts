export interface ICreateTask {
  userId: string;
  title: string;
  taskImage: string;
  isVital?: boolean;
  date: Date;
  description: string;
  priorityId: string;
  statusId: string;
}

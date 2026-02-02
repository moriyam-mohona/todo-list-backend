export interface ICreateTask {
  id: string;
  userId: string;
  title: string;
  taskImage: string;
  isVital: boolean;
  date: Date;
  description: string;
  priority: string;
  status: string;
}

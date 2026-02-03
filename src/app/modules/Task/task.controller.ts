import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ICreateTask } from "./task.interface";
import { TaskService } from "./task.service";
import httpStatus from "http-status";

// Create Task
const createTask = catchAsync(async (req, res): Promise<void> => {
  const userId = req.user.id;
  const data = (req.body.data as ICreateTask)
    ? JSON.parse(req.body.data)
    : (req.body.data as ICreateTask);
  const file = req.file;

  const taskImage = `${config.backend_url}/${file?.filename}`;

  const payload = {
    ...data,
    taskImage,
    userId,
  };

  const result = await TaskService.createTask(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "A new task created successfully",
    data: result,
  });
});

// get all my tasks
const getAllMyTasks = catchAsync(async (req, res): Promise<void> => {
  const userId = req.user.id;

  const result = await TaskService.getAllMyTasks(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Tasks retrieved successfully",
    data: result,
    meta: {
      page: 1,
      limit: result.length,
      total: result.length,
    },
  });
});

// get task details
const getTaskDetails = catchAsync(async (req, res): Promise<void> => {
  const taskId = req.params.taskId as string;
  const userId = req.user.id;

  const result = await TaskService.getTaskDetails(taskId, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Task details retrieved successfully",
    data: result,
  });
});

// update vital status
const updateVitalStatus = catchAsync(async (req, res): Promise<void> => {
  const taskId = req.params.taskId as string;
  const userId = req.user.id;
  const { isVital } = req.body;

  const result = await TaskService.updateVitalStatus(taskId, userId, isVital);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Task vital status updated successfully",
    data: result,
  });
});

// delete task
const deleteTask = catchAsync(async (req, res): Promise<void> => {
  const taskId = req.params.taskId as string;
  const userId = req.user.id;

  const result = await TaskService.deleteTask(taskId, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Task deleted successfully",
    data: result,
  });
});

const updateTask = catchAsync(async (req, res): Promise<void> => {
  const taskId = req.params.taskId as string;
  const payload = (req.body.data as Partial<ICreateTask>)
    ? JSON.parse(req.body.data)
    : (req.body.data as Partial<ICreateTask>);
  const file = req.file;

  const taskImage = `${config.backend_url}/${file?.filename}`;

  const result = await TaskService.updateTask(taskId, {
    ...payload,
    taskImage,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Task updated successfully",
    data: result,
  });
});

export const TaskController = {
  createTask,
  getAllMyTasks,
  getTaskDetails,
  updateVitalStatus,
  deleteTask,
  updateTask,
};

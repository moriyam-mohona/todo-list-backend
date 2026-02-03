import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ICreateTask } from "./task.interface";
import { TaskService } from "./task.service";
import httpStatus from "http-status";

// Create Task
const createTask = catchAsync(async (req, res) => {
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

export const TaskController = {
  createTask,
};

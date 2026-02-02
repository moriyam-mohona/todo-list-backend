import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { TaskService } from "./task.service";
import httpStatus from "http-status";
const createTask = catchAsync(async (req, res) => {
  const userID = req.user.id;

  const result = await TaskService.createTask();
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

import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PriorityService } from "./priority.service";
import sendResponse from "../../../shared/sendResponse";

const createPriority = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user.id;
    const data = {
      userId,
      priority: req.body.priority,
    };

    const result = await PriorityService.createPriority(data);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "A new priority created successfully",
      data: result,
    });
  },
);

const getAllMyPriority = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user.id;

    const result = await PriorityService.getAllMyPriority(userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All my priorities fetched successfully",
      data: result,
    });
  },
);

export const PriorityController = {
  createPriority,
  getAllMyPriority,
};

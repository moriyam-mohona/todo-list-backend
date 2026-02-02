import catchAsync from "../../../shared/catchAsync";
import { StatusService } from "./status.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { Request, Response } from "express";

const createStatus = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user.id;

    const result = await StatusService.createStatus({
      userId,
      name: req.body.name,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "A new status created successfully",
      data: result,
    });
  },
);

const getAppStatus = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user.id;

    const result = await StatusService.getAllStatus(userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Status Fetched Successfully",
      data: result,
    });
  },
);

export const StatusController = {
  createStatus,
  getAppStatus,
};

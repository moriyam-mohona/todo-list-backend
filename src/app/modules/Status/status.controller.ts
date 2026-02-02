import catchAsync from "../../../shared/catchAsync";
import { StatusService } from "./status.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createStatus = catchAsync(async (req, res): Promise<void> => {
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
});

export const StatusController = {
  createStatus,
};

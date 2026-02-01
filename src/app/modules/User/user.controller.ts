import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userData = req.body;

    const result = await UserService.createUser(userData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created successfully",
      data: result,
    });
  },
);

const loginUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const loginData = req.body;

    const result = await UserService.loginUser(loginData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      data: result,
    });
  },
);

export const UserController = {
  createUser,
  loginUser,
};

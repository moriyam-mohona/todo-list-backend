import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userData = req.body;

    const result = await AuthService.createUser(userData);

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

    const result = await AuthService.loginUser(loginData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      data: result,
    });
  },
);

const changePassword = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user.id;

    const { oldPassword, newPassword } = req.body;

    const result = await AuthService.changePassword({
      userId,
      oldPassword,
      newPassword,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Password Changed Successfully",
      data: result,
    });
  },
);

export const AuthController = {
  createUser,
  loginUser,
  changePassword,
};

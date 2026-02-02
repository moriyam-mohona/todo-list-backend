import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../lib/prisma";
import { compareItem, hashItem } from "../../../utils/hashAndCompareItem";
import {
  IChangePassword,
  ILogin,
  IUpdateProfile,
  IUser,
} from "./auth.interface";
import { jwtHelpers } from "../../../utils/jwtHelpers";
import config from "../../../config";

const createUser = async (userData: IUser) => {
  const hashPassword = await hashItem(userData.password);

  const isUserExist = await prisma.user.findFirst({
    where: { OR: [{ email: userData.email }, { userName: userData.userName }] },
  });

  if (isUserExist) {
    throw new ApiError(httpStatus.CONFLICT, "Email or Username already exists");
  }

  const user = await prisma.user.create({
    data: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      userName: userData.userName,
      password: hashPassword,
      isAgreed: userData.isAgreed,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      userName: true,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.BAD_GATEWAY, "Failed to create user");
  }

  return user;
};

const loginUser = async (loginData: ILogin) => {
  const user = await prisma.user.findUnique({
    where: {
      email: loginData.email,
    },
    select: {
      id: true,
      email: true,
      userName: true,
      firstName: true,
      lastName: true,
      password: true,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  // Check if password matches
  const isPasswordMatch = await compareItem(loginData.password, user.password);

  // Further password verification logic will be added here
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid mail or password");
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const accessToken = jwtHelpers.generateToken(
    payload,
    config.jwt.jwt_secret,
    config.jwt.expires_in,
  );

  const refreshToken = jwtHelpers.generateToken(
    payload,
    config.jwt.refresh_token_secret,
    config.jwt.refresh_token_expires_in,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (passwordData: IChangePassword) => {
  const { userId, oldPassword, newPassword } = passwordData;

  //Find user by id
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }

  //verify old pass
  const isOldPassword = await compareItem(oldPassword, user.password);

  if (!isOldPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Old password is incorrect");
  }

  //prevent using same pass
  const isSamePass = await compareItem(newPassword, user.password);

  if (isSamePass) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "New password must be different from old password",
    );
  }

  //hash new password
  const hashedNewPassword = await hashItem(newPassword);

  //update password
  await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedNewPassword,
    },
  });

  return {
    message: "Password changed successfully",
  };
};

const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

const updateProfile = async (payload: IUpdateProfile) => {
  const { userId, ...updateData } = payload;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // update only provided fields
  const updatedData = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      email: true,
      profileImage: true,
      userName: true,
      firstName: true,
      lastName: true,
      contactNo: true,
      position: true,
      updatedAt: true,
    },
  });

  return updatedData;
};

export const AuthService = {
  createUser,
  loginUser,
  changePassword,
  getMe,
  updateProfile,
};

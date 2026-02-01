import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../lib/prisma";
import { compareItem, hashItem } from "../../../utils/hashAndCompareItem";
import { IUser } from "./user.interface";

const createUser = async (userData: IUser) => {
  const hashPassword = await hashItem(userData.password);

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

  const isUserExist = await prisma.user.findFirst({
    where: { OR: [{ email: userData.email }, { userName: userData.userName }] },
  });

  if (isUserExist) {
    throw new ApiError(httpStatus.CONFLICT, "Email or Username already exists");
  }

  return user;
};

const loginUser = async (loginData: { email: string; password: string }) => {
  // Implementation for user login will go here

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
  if (!isPasswordMatch || user.email !== loginData.email) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid mail or password");
  }

  return user;
};

export const UserService = {
  createUser,
  loginUser,
};

import ApiError from "../../../errors/apiError";
import prisma from "../../../lib/prisma";
import { ICreateStatus } from "./status.interface";
import httpStatus from "http-status";

const createStatus = async (data: ICreateStatus) => {
  const isExist = await prisma.status.findUnique({
    where: {
      name_userId: {
        userId: data.userId,
        name: data.name,
      },
    },
  });

  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, "This Status Already Exist");
  }

  const status = await prisma.status.create({
    data: {
      name: data.name,
      userId: data.userId,
    },
    select: {
      id: true,
      name: true,
    },
  });
  return status;
};

const getAllStatus = async (userId: string) => {
  const statuses = await prisma.status.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return statuses;
};

const getSingleStatus = async (statusId: string, userId: string) => {
  const status = await prisma.status.findUnique({
    where: {
      id: statusId,
      userId: userId,
    },
  });

  if (!status) {
    throw new ApiError(httpStatus.NOT_FOUND, "Status not found");
  }

  return status;
};

export const StatusService = {
  createStatus,
  getAllStatus,
  getSingleStatus,
};

import ApiError from "../../../errors/apiError";
import prisma from "../../../lib/prisma";
import { ICreateStatus, IUpdateStatus } from "./status.interface";
import httpStatus from "http-status";

const createStatus = async (data: ICreateStatus) => {
  const isExist = await prisma.status.findUnique({
    where: {
      status_userId: {
        userId: data.userId,
        status: data.status,
      },
    },
  });

  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, "This Status Already Exist");
  }

  const status = await prisma.status.create({
    data: {
      status: data.status,
      userId: data.userId,
    },
    select: {
      id: true,
      status: true,
    },
  });
  return status;
};

const getAllStatus = async (userId: string) => {
  const statuses = await prisma.status.findMany({
    where: { userId },
    select: {
      id: true,
      status: true,
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

const updateStatus = async (data: IUpdateStatus) => {
  const isStatus = await prisma.status.findUnique({
    where: {
      id: data.statusId,
    },
  });

  if (!isStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, "Status not found");
  }

  if (isStatus.userId != data.userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED");
  }

  const updatedData = await prisma.status.update({
    where: {
      id: data.statusId,
    },
    data: { status: data.status },
  });

  return updatedData;
};

const deleteStatus = async (userId: string, statusId: string) => {
  const isStatus = await prisma.status.findUnique({
    where: {
      id: statusId,
    },
  });
  if (!isStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, "Status not found");
  }

  if (isStatus.userId != userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED");
  }

  return await prisma.status.delete({
    where: { id: statusId },
  });
};

export const StatusService = {
  createStatus,
  getAllStatus,
  getSingleStatus,
  updateStatus,
  deleteStatus,
};

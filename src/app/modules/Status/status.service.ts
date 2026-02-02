import ApiError from "../../../errors/apiError";
import prisma from "../../../lib/prisma";
import { ICreateStatus } from "./status.interface";
import httpStatus from "http-status";

const createStatus = async (data: ICreateStatus) => {
  const isExist = await prisma.status.findFirst({
    where: {
      name: data.name,
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

export const StatusService = {
  createStatus,
  getAllStatus,
};

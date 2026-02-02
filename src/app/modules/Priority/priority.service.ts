import ApiError from "../../../errors/apiError";
import prisma from "../../../lib/prisma";
import { ICreatePriority } from "./priority.interface";
import httpStatus from "http-status";

const createPriority = async (data: ICreatePriority) => {
  const isExist = await prisma.priority.findUnique({
    where: {
      priority_userId: {
        userId: data.userId,
        priority: data.priority,
      },
    },
  });

  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, "This priority already exist");
  }

  return await prisma.priority.create({
    data: {
      priority: data.priority,
      userId: data.userId,
    },
  });
};

const getAllMyPriority = async (userId: string) => {
  return await prisma.priority.findMany({
    where: { userId },
    select: {
      id: true,
      priority: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const PriorityService = {
  createPriority,
  getAllMyPriority,
};

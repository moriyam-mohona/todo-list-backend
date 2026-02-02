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

const getSinglePriority = async (priorityId: string) => {
  const priority = await prisma.priority.findUnique({
    where: { id: priorityId },
  });

  if (!priority) {
    throw new ApiError(httpStatus.NOT_FOUND, "Priority not found");
  }

  return priority;
};

const updatePriority = async (
  userId: string,
  priorityId: string,
  priority: string,
) => {
  const isPriority = await prisma.priority.findUnique({
    where: { id: priorityId },
  });

  if (!isPriority) {
    throw new ApiError(httpStatus.NOT_FOUND, "Priority not found");
  }

  if (isPriority.userId != userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
  }

  const update = await prisma.priority.update({
    where: { id: priorityId },
    data: {
      priority: priority,
    },
  });

  return update;
};

const deletePriority = async (priorityId: string, userId: string) => {
  const isPriority = await prisma.priority.findUnique({
    where: { id: priorityId },
  });
  if (!isPriority) {
    throw new ApiError(httpStatus.NOT_FOUND, "Priority not found");
  }

  if (isPriority.userId != userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
  }

  const deletePriority = await prisma.priority.delete({
    where: { id: priorityId },
  });
  return deletePriority;
};

export const PriorityService = {
  createPriority,
  getAllMyPriority,
  getSinglePriority,
  updatePriority,
  deletePriority,
};

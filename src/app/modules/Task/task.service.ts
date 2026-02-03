import ApiError from "../../../errors/apiError";
import prisma from "../../../lib/prisma";
import { ICreateTask } from "./task.interface";
import httpStatus from "http-status";

const createTask = async (payload: ICreateTask) => {
  const priority = await prisma.priority.findUnique({
    where: {
      id: payload.priorityId,
      userId: payload.userId,
    },
  });

  if (!priority) {
    throw new ApiError(httpStatus.NOT_FOUND, "Priority not found");
  }

  const status = await prisma.status.findUnique({
    where: {
      id: payload.statusId,
      userId: payload.userId,
    },
  });
  if (!status) {
    throw new ApiError(httpStatus.NOT_FOUND, "Status not found");
  }

  const create = await prisma.task.create({
    data: {
      title: payload.title,
      description: payload.description,
      taskImage: payload.taskImage,
      isVital: payload.isVital ?? false,
      priorityId: payload.priorityId,
      statusId: payload.statusId,
      date: new Date(payload.date),
      userId: payload.userId,
    },
  });

  return create;
};

export const TaskService = {
  createTask,
};

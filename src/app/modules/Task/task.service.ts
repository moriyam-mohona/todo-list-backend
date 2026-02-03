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

const getAllMyTasks = async (userId: string) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId,
      priority: { userId },
      status: { userId },
    },
    include: {
      priority: {
        select: {
          priority: true,
        },
      },
      status: {
        select: {
          status: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return tasks.map((task) => ({
    id: task.id,
    title: task.title,
    taskImage: task.taskImage,
    description: task.description,
    priority: task.priority.priority,
    status: task.status.status,
    isVital: task.isVital,
    date: task.date,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  }));
};

const getTaskDetails = async (taskId: string, userId: string) => {
  if (!taskId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Task ID is required");
  }

  const task = await prisma.task.findUnique({
    where: { id: taskId }, // only id here
    include: {
      priority: { select: { priority: true } },
      status: { select: { status: true } },
    },
  });

  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }

  // Authorization check
  if (task.userId !== userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  return task;
};

const updateVitalStatus = async (
  taskId: string,
  userId: string,
  isVital: boolean,
) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }

  if (task.userId !== userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }
  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: { isVital },
  });

  return updatedTask;
};

const deleteTask = async (taskId: string, userId: string) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }
  if (task.userId !== userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }
  const deletedTask = await prisma.task.delete({
    where: { id: taskId },
  });
  return deletedTask;
};

export const TaskService = {
  createTask,
  getAllMyTasks,
  getTaskDetails,
  updateVitalStatus,
  deleteTask,
};

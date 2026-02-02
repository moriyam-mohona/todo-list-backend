import ApiError from "../../../errors/apiError";
import prisma from "../../../lib/prisma";
import { ICreateStatus } from "./status.interface";
import httpStatus from "http-status";

const createStatus = async (data: ICreateStatus) => {
  // const isUserExist = await prisma.user.findUnique({
  //   where: { id: data.userId },
  // });

  // if (!isUserExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  // }

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

export const StatusService = {
  createStatus,
};

import { NextFunction, Response, Request } from "express";
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";
import config from "../../config";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  // check header
  if (!authHeader) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization token missing");
  }

  //   Extract token
  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid authorization forma");
  }

  try {
    //verify token
    const decoded = jwt.verify(token, config.jwt.jwt_secret) as JwtPayload;

    // Attach user to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid or expired token");
  }
};

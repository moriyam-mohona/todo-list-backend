import express from "express";
import { UserController } from "./user.controller";

import { RequestValidation } from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/signup",
  RequestValidation.validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
);

router.post(
  "/login",
  RequestValidation.validateRequest(UserValidation.loginUserZodSchema),
  UserController.loginUser,
);

export const UserRoutes = router;

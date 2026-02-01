import express from "express";
import { AuthController } from "./auth.controller";

import { RequestValidation } from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post(
  "/register",
  RequestValidation.validateRequest(AuthValidation.createUserZodSchema),
  AuthController.createUser,
);

router.post(
  "/login",
  RequestValidation.validateRequest(AuthValidation.loginUserZodSchema),
  AuthController.loginUser,
);

router.patch(
  "/change-password",
  authMiddleware,
  RequestValidation.validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.changePassword,
);

export const AuthRoutes = router;

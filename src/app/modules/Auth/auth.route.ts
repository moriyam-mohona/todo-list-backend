import express from "express";
import { AuthController } from "./auth.controller";

import { RequestValidation } from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/signup",
  RequestValidation.validateRequest(AuthValidation.createUserZodSchema),
  AuthController.createUser,
);

router.post(
  "/login",
  RequestValidation.validateRequest(AuthValidation.loginUserZodSchema),
  AuthController.loginUser,
);

export const AuthRoutes = router;

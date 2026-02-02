import express from "express";
import { AuthController } from "./auth.controller";

import { RequestValidation } from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { imageUploader } from "../../../helpers/file_uploader/imageUploader";

const router = express.Router();
const profileUploader = imageUploader.single("profileImage");

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

router.get("/get-me", authMiddleware, AuthController.getMe);

router.patch(
  "/update-profile",
  authMiddleware,
  profileUploader,
  // RequestValidation.validateRequest(AuthValidation.updateProfileZodSchema),
  AuthController.updateProfile,
);

export const AuthRoutes = router;

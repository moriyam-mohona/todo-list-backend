import express from "express";
import { RequestValidation } from "../../middlewares/validateRequest";
import { StatusValidation } from "./status.validation";
import { StatusController } from "./status.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  RequestValidation.validateRequest(StatusValidation.createStatusZodScheme),
  StatusController.createStatus,
);

router.get("/all", authMiddleware, StatusController.getAppStatus);

export const StatusRoutes = router;

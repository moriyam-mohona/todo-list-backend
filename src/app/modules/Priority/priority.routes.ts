import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { RequestValidation } from "../../middlewares/validateRequest";
import { PriorityValidation } from "./priority.validation";
import { PriorityController } from "./priority.controller";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  RequestValidation.validateRequest(PriorityValidation.createPriorityZodSchema),
  PriorityController.createPriority,
);

export const PriorityRoutes = router;

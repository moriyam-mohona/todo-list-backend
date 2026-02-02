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
router.get("/all", authMiddleware, PriorityController.getAllMyPriority);

export const PriorityRoutes = router;

import express from "express";
import { TaskController } from "./task.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { imageUploader } from "../../../helpers/file_uploader/imageUploader";

const router = express.Router();
const taskUploader = imageUploader.single("taskImage");

router.post(
  "/create",
  authMiddleware,
  taskUploader,
  // RequestValidation.validateRequest(TaskValidation.taskCreateZodSchema),
  TaskController.createTask,
);

export const TaskRoutes = router;

import express from "express";
import { TaskController } from "./task.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { imageUploader } from "../../../helpers/file_uploader/imageUploader";

const router = express.Router();
const taskUploader = imageUploader.single("taskImage");

router.post("/create", authMiddleware, taskUploader, TaskController.createTask);

router.get("/my-tasks", authMiddleware, TaskController.getAllMyTasks);

router.get("/:taskId", authMiddleware, TaskController.getTaskDetails);

router.patch(
  "/:taskId/vital-status",
  authMiddleware,
  TaskController.updateVitalStatus,
);

router.delete("/:taskId", authMiddleware, TaskController.deleteTask);

router.patch(
  "/:taskId",
  authMiddleware,
  taskUploader,
  TaskController.updateTask,
);

export const TaskRoutes = router;

import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { StatusRoutes } from "../modules/Status/status.routes";
import { PriorityRoutes } from "../modules/Priority/priority.routes";
import { TaskRoutes } from "../modules/Task/task.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: AuthRoutes,
  },
  {
    path: "/status",
    route: StatusRoutes,
  },
  {
    path: "/priority",
    route: PriorityRoutes,
  },
  {
    path: "/task",
    route: TaskRoutes,
  },
];

moduleRoutes.forEach((r) => router.use(r.path, r.route));

export default router;

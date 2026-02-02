import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { StatusRoutes } from "../modules/Status/status.routes";

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
];

moduleRoutes.forEach((r) => router.use(r.path, r.route));

export default router;

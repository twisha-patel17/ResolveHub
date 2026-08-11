import { Router } from "express";

import { getAdminDashboard } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.get(
  "/dashboard",
  verifyJWT,
  authorizeRoles("admin"),
  getAdminDashboard
);

export default router;
import { Router } from "express";
import { getUserDashboard } from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", verifyJWT, getUserDashboard);

export default router;
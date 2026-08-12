import { Router } from "express";

import {
  registerUser,
  loginUser,
  loginAdmin,
  logoutUser,
  getCurrentUser,
  refreshAccessToken,
} from "../controllers/auth.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/admin/login", loginAdmin);

router.post("/logout", verifyJWT, logoutUser);

router.get("/me", verifyJWT, getCurrentUser);

router.post("/refresh-token", refreshAccessToken);

export default router;
import { Router } from "express";
import { registerUser, loginUser, logoutUser, getCurrentUser, refreshAccessToken } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.get("/me", verifyJWT, getCurrentUser);
router.post("/refresh-token", refreshAccessToken);
router.get(
  "/admin-test",
  verifyJWT,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin 🚀",
    });
  }
);

export default router;
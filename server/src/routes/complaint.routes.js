import express from "express";

import { createComplaint, getComplaintById, getMyComplaints, updateComplaint, deleteComplaint, getAllComplaints, updateComplaintStatus, getDashboardStats } from "../controllers/complaint.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/",verifyJWT,createComplaint);
router.get("/my",verifyJWT,getMyComplaints);
router.get("/:id",verifyJWT,getComplaintById);
router.put("/:id",verifyJWT, updateComplaint);
router.delete(
  "/:id",
  verifyJWT,
  deleteComplaint
);
router.get(
  "/",
  verifyJWT,
  authorizeRoles("admin"),
  getAllComplaints
);

export default router;
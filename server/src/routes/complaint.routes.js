import express from "express";

import {
  createComplaint,
  getComplaintById,
  getMyComplaints,
  updateComplaint,
  deleteComplaint,
  getAllComplaints,
  updateComplaintStatus,
  getDashboardStats,
  addReply,
} from "../controllers/complaint.controller.js";
import upload from "../middleware/upload.middleware.js";
import uploadToCloudinary from "../middleware/cloudinaryUpload.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// USER
router.post(
  "/",
  verifyJWT,
  upload.array("images", 5),
  uploadToCloudinary,
  createComplaint
); 

router.get(
  "/my",
  verifyJWT,
  getMyComplaints
);

router.get(
  "/:id",
  verifyJWT,
  getComplaintById
);

router.put(
  "/:id",
  verifyJWT,
  updateComplaint
);

router.delete(
  "/:id",
  verifyJWT,
  deleteComplaint
);

// ADMIN
router.get(
  "/admin/all",
  verifyJWT,
  authorizeRoles("admin"),
  getAllComplaints
);

router.patch(
  "/:id/status",
  verifyJWT,
  authorizeRoles("admin"),
  updateComplaintStatus
);

router.post(
  "/:id/reply",
  verifyJWT,
  authorizeRoles("admin"),
  addReply
);

router.get(
  "/dashboard/stats",
  verifyJWT,
  authorizeRoles("admin"),
  getDashboardStats
);

export default router;
import express from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";

import { getMyNotifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } from "../controllers/notification.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/", verifyJWT ,getMyNotifications);

router.patch("/read-all", markAllNotificationsAsRead );

router.patch("/:id/read",verifyJWT ,markNotificationAsRead );

router.delete("/:id", verifyJWT ,deleteNotification );

export default router;
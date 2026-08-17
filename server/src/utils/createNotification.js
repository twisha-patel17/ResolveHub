import Notification from "../models/Notification.model.js";
import { getIO } from "../sockets/socket.js";

const createNotification = async ({
  recipient,
  complaint,
  title,
  message,
  type,
}) => {
  const notification = await Notification.create({
    recipient,
    complaint,
    title,
    message,
    type,
  });

  await notification.populate("complaint");

  try {
    const io = getIO();

    io.to(`user:${recipient.toString()}`).emit(
      "new-notification",
      notification
    );
  } catch (socketError) {
    console.error(
      "Socket notification error:",
      socketError.message
    );
  }

  return notification;
};

export default createNotification;
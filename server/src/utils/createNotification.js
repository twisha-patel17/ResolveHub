import Notification from "../models/Notification.model.js";

const createNotification = async ({
  recipient,
  complaint = null,
  title,
  message,
  type = "status",
}) => {
  return await Notification.create({
    recipient,
    complaint,
    title,
    message,
    type,
  });
};

export default createNotification;
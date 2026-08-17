import { Server } from "socket.io";

let io;

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("join-user", (userId) => {
      if (!userId) return;

      socket.join(`user:${userId}`);
      console.log(
        `User ${userId} joined user:${userId}`
      );
    });

    socket.on("join-complaint", (complaintId) => {
      if (!complaintId) return;

      socket.join(`complaint:${complaintId}`);
      console.log(
        `Socket ${socket.id} joined complaint:${complaintId}`
      );
    });

    socket.on("leave-complaint", (complaintId) => {
      if (!complaintId) return;

      socket.leave(`complaint:${complaintId}`);
    });

    socket.on("disconnect", () => {
      console.log(
        `Socket disconnected: ${socket.id}`
      );
    });
  });

  console.log("Socket.IO initialized");

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.IO has not been initialized"
    );
  }

  return io;
};
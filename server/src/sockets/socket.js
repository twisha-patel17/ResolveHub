import { Server } from "socket.io";

let io;

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    socket.on("join-user", (userId) => {
      if (!userId) return;

      socket.join(`user:${userId}`);

      console.log(
        `👤 User ${userId} joined room user:${userId}`
      );
    });

    socket.on("disconnect", () => {
      console.log(
        `🔌 Socket disconnected: ${socket.id}`
      );
    });
  });

  console.log("⚡ Socket.IO initialized");

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
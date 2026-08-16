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
    console.log(
      `🔌 Socket connected: ${socket.id}`
    );

    // User room
    socket.on("join-user", (userId) => {
      if (!userId) return;

      socket.join(`user:${userId}`);

      console.log(
        `👤 User ${userId} joined room user:${userId}`
      );
    });

    // Complaint room
    socket.on(
      "join-complaint",
      (complaintId) => {
        if (!complaintId) return;

        socket.join(
          `complaint:${complaintId}`
        );

        console.log(
          `💬 Socket ${socket.id} joined complaint:${complaintId}`
        );
      }
    );

    // Leave complaint room
    socket.on(
      "leave-complaint",
      (complaintId) => {
        if (!complaintId) return;

        socket.leave(
          `complaint:${complaintId}`
        );

        console.log(
          `💬 Socket ${socket.id} left complaint:${complaintId}`
        );
      }
    );

    socket.on("disconnect", () => {
      console.log(
        `🔌 Socket disconnected: ${socket.id}`
      );
    });
  });

  console.log(
    "⚡ Socket.IO initialized"
  );

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
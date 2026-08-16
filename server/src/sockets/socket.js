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
    console.log(`🔌 Connected: ${socket.id}`);

    socket.on("join-user", (userId) => {
      if (!userId) return;

      socket.join(`user:${userId}`);
      console.log(`User joined: ${userId}`);
    });

    socket.on("join-admin", (adminId) => {
      if (!adminId) return;

      socket.join(`admin:${adminId}`);
      console.log(`Admin joined: ${adminId}`);
    });

    socket.on("join-complaint", (complaintId) => {
      if (!complaintId) return;

      socket.join(`complaint:${complaintId}`);
      console.log(`Joined complaint: ${complaintId}`);
    });

    socket.on("leave-complaint", (complaintId) => {
      if (!complaintId) return;

      socket.leave(`complaint:${complaintId}`);
    });

    socket.on("disconnect", () => {
      console.log(`🔌 Disconnected: ${socket.id}`);
    });
  });

  console.log("⚡ Socket.IO initialized");

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized");
  }

  return io;
};
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const useSocket = (userId) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io(SOCKET_URL, {
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🔌 Connected to Socket.IO:", socket.id);

      // We'll use this room for user-specific notifications
      socket.emit("join:user", userId);
    });

    socket.on("disconnect", () => {
      console.log("🔌 Disconnected from Socket.IO");
    });

    socket.on("connect_error", (error) => {
      console.error(
        "❌ Socket connection error:",
        error.message
      );
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId]);

  return socketRef;
};

export default useSocket;
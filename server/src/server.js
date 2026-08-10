import dotenv from "dotenv";
dotenv.config();

import http from "http";

import app from "./app.js";
import connectDB from "./config/db.js";
import { initializeSocket } from "./sockets/socket.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initializeSocket(server);

connectDB();

server.listen(PORT, () => {
  console.log(
    `🚀 Server is running on http://localhost:${PORT}`
  );
});
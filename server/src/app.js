import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import complaintRoutes from "./routes/complaint.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ResolveHub API is running 🚀",
  });
});

app.use(errorHandler);

export default app;
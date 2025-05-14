import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import authRoutes from "features/auth";
import cloudRoutes from "features/cloud";
import userRoutes from "features/user";
import errorHandler from "@shared/lib/middleware/error.middleware";
import loggerMiddleware from "@shared/lib/middleware/logger.middleware";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use(loggerMiddleware);

app.use("/api", cloudRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);

app.use(errorHandler);

export default app;

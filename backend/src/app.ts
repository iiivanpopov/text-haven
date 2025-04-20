import errorHandler from "@middleware/error.middleware";
import loggerMiddleware from "@middleware/logger.middleware";
import authRoutes from "@modules/auth";
import cloudRoutes from "@modules/cloud";
import userRoutes from "@modules/user";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

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

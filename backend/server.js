import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import colors from "colors";
import cookieParser from "cookie-parser";
// Routes
import userRoutes from "./routes/userRoutes.js";
import universityRoutes from "./routes/universityRoutes.js";
import majorRoutes from "./routes/majorRoutes.js";
import residenceAddressRoutes from "./routes/residenceAddressRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import morgan from "morgan";
import limiter from "./utils/limiter.js";
dotenv.config();

connectDB();

const app = express();
app.use(limiter);
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "development") app.use(morgan("dev"));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/universities", universityRoutes);
app.use("/api/v1/majors", majorRoutes);
app.use("/api/v1/residenceAddresses", residenceAddressRoutes);
app.use("/api/v1/announcements", announcementRoutes);
app.use("/api/v1/documents", documentRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

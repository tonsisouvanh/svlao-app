import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import cors from "cors";
// Routes
import userRoutes from "./routes/userRoutes.js";
import universityRoutes from "./routes/universityRoutes.js";
import majorRoutes from "./routes/majorRoutes.js";
import residenceAddressRoutes from "./routes/residenceAddressRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";

import generateToken from "./utils/generateToken.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import bcrypt from "bcryptjs";
import { modifyData } from "./utils/fixData.js";
import morgan from "morgan";
dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
if (process.env.NODE_ENV !== "development") app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/users", userRoutes);
app.use("/api/universities", universityRoutes);
app.use("/api/majors", majorRoutes);
app.use("/api/residenceAddresses", residenceAddressRoutes);
app.use("/api/announcements", announcementRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// const token = generateToken("657ef15fad56bd9902cd2974");
// console.log(token);

// console.log(bcrypt.hashSync('123456', 10),)

// modifyData();

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

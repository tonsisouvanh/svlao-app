import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import universityRoutes from "./routes/universityRoutes.js";
import generateToken from "./utils/generateToken.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import bcrypt from "bcryptjs";
import { modifyData } from "./utils/fixData.js";
dotenv.config();

// connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running....");
});

// app.use("/api/users", userRoutes);
// app.use("/api/universities", universityRoutes);

// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// const token = generateToken("657ef15fad56bd9902cd2974");
// console.log(token);

// console.log(bcrypt.hashSync('123456', 10),)

modifyData();

// app.listen(
//   PORT,
//   console.log(
//     `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
//   )
// );

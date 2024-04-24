import rateLimit from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: process.env.NODE_ENV === "development" ? 10000 : 70,
  message: "You have exceeded your requests limit.",
  headers: true,
});

export default limiter;

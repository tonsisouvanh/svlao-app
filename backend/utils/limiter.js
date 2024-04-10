import rateLimit from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  message: "You have exceeded your 50 requests per minute limit.",
  headers: true,
});

export default limiter;

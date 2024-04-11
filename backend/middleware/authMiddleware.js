import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  const accesstoken = req.cookies?.accesstoken;
  if (accesstoken) {
    try {
      const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, access token failed");
    }
  }

  if (!accesstoken) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
const activeUserCheck = asyncHandler(async (req, res, next) => {
  const { emailAddress } = req.body;
  const user = await User.findOne({ emailAddress });
  if (user && user.userStatus === "inactive") {
    throw new Error("Your account has not been approved");
  } else {
    next();
  }
});

const authorizeUserAdmin = (roles = []) =>
  asyncHandler(async (req, res, next) => {
    const accesstoken = req.cookies.accesstoken;
    if (accesstoken) {
      try {
        const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
        req.user = await User.findById(decoded?.userId).select("-password");
        // if (req.user && req.user.role === "admin") {
        if (req.user && roles.includes(req.user.role)) {
          next();
        } else {
          res.status(401);
          throw new Error("Not authorized as an admin");
        }
      } catch (error) {
        console.error(error);
        res.status(400);
        throw new Error("Error authorizing user");
      }
    }
  });

export { protect, authorizeUserAdmin, activeUserCheck };

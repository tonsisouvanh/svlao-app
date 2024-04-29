import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const accesstoken = req.cookies?.accesstoken;
  if (accesstoken) {
    try {
      const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select(
        "-password -refreshToken"
      );
      if (!user) return res.status(404).json({ message: "User not found" });
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(403)
          .json({ message: "Forbidden: Access token expired" });
      } else {
        return res
          .status(401)
          .json({ message: "Not authorized: Invalid access token" });
      }
    }
  }

  if (!accesstoken) {
    res.status(401).json({ message: "Not authorized: Missing access token", isReSigin: true });
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

export { verifyJWT, authorizeUserAdmin, activeUserCheck };

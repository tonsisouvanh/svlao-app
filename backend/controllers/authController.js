import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import Token from "../models/tokenModel.js";
import jwt from "jsonwebtoken";
import { validateLoginInput } from "../validators/userValidators.js";
import logger from "../utils/logger.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import { v1 as uuidv1 } from "uuid";
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { emailAddress, password } = req.body;
  // Validate input data
  const { error } = validateLoginInput(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await User.findOne({ emailAddress }).exec();

    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate token and set it to cookies
      const { refreshToken } = generateToken(res, {
        userId: user._id,
        emailAddress: user.emailAddress,
        role: user.role,
      });

      user.refreshToken = refreshToken;
      user.lastLogin = new Date();
      await user.save({ validateBeforeSave: false });

      return res.json({
        _id: user._id,
        laoName: user.fullname.laoName,
        emailAddress: user.emailAddress,
        profileImg: user.profileImg,
        role: user.role,
        lastLogin: user.lastLogin,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    logger.error("Error during user authentication:", error);
    res
      .status(500)
      .json({ message: "An error occurred during authentication" });
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = asyncHandler(async (req, res) => {
  try {
    // Ensure the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Invalidate the refresh token in the database
    await User.findByIdAndUpdate(
      req.user._id,
      { $set: { refreshToken: undefined } },
      { new: true }
    );
    // Clear access and refresh tokens cookies
    res.clearCookie(process.env.ACCESSTOKEN_COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.clearCookie(process.env.REFRESHTOKEN_COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.error("Logout error:", error.message);
    return res.status(500).json({ message: "Error: Logout failed" });
  }
});

// @desc    Refresh access token
// @route   POST /api/users/refresh-token
// @access  Private
// const refreshToken = asyncHandler(async (req, res) => {
//   const incomingRefreshToken = req.cookies.laostudent_refreshtoken;
//   // Check if refresh token is provided
//   if (!incomingRefreshToken) {
//     return res.status(401).json({ message: "Missing refresh token" });
//   }

//   try {
//     // Verify the incoming refresh token
//     const decoded = jwt.verify(incomingRefreshToken, process.env.JWT_SECRET);
//     // Find the user by ID
//     const user = await User.findById(decoded?.userId);

//     // Check if user exists
//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     // Check if the refresh token matches the one stored in the database
//     if (user?.refreshToken !== incomingRefreshToken) {
//       return res.status(401).json({ message: "Incorrect refresh token" });
//     }

//     // Generate new tokens and set them in cookies
//     const { refreshToken: newRefreshToken } = generateToken(res, {
//       userId: user._id,
//       emailAddress: user.emailAddress,
//       role: user.role,
//     });

//     // Update the user's refresh token in the database
//     user.refreshToken = newRefreshToken;
//     await user.save({ validateBeforeSave: false });

//     return res.status(200).json({ message: "Token refreshed" });
//   } catch (error) {
//     console.error("Refresh token error:", error.message);
//     return res.status(400).json({
//       message: "Refresh token failed",
//       isRefreshTokenExpired: true,
//     });
//   }
// });
export const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.laostudent_refreshtoken;

  // Check if refresh token is provided
  if (!incomingRefreshToken) {
    return res.status(401).json({ message: "Missing refresh token" });
  }

  try {
    // Verify the incoming refresh token
    const decoded = jwt.verify(incomingRefreshToken, process.env.JWT_SECRET);

    // Find the user by ID
    const user = await User.findById(decoded?.userId);

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check if the refresh token matches the one stored in the database
    if (user?.refreshToken !== incomingRefreshToken) {
      return res.status(401).json({ message: "Incorrect refresh token" });
    }

    // Generate new tokens and set them in cookies
    const { refreshToken: newRefreshToken } = generateToken(res, {
      userId: user._id,
      emailAddress: user.emailAddress,
      role: user.role,
    });

    // Update the user's refresh token in the database
    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({ message: "Token refreshed" });
  } catch (error) {
    console.error("Refresh token error:", error.message);

    // Check if the error is due to token expiration
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Refresh token expired",
        isRefreshTokenExpired: true,
      });
    }

    return res.status(400).json({
      message: "Refresh token failed",
      isRefreshTokenExpired: true,
    });
  }
});
// @desc    Request password reset
// @route   POST /api/users/request-reset-password
// @access  Public
export const requestResetPassword = asyncHandler(async (req, res) => {
  const { emailAddress } = req.body;
  // Validate input data
  if (!emailAddress) {
    return res.status(400).json({ message: "Email address is required" });
  }

  try {
    // Find the user by email address
    const user = await User.findOne({ emailAddress });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Delete any existing token for user
    let tokenObj = await Token.findOne({ userId: user._id });
    if (tokenObj) await tokenObj.deleteOne();

    // Generate a new reset token
    const resetToken = uuidv1();
    const hashToken = await bcrypt.hash(resetToken, 10);

    // Save the new token in the database
    await new Token({
      userId: user._id,
      refreshToken: hashToken,
      createdAt: Date.now(),
    }).save();

    // Send the reset token to the user's email
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/users/reset-password?token=${resetToken}&id=${user._id}`;
    const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    // await sendEmail({
    //   email: user.emailAddress,
    //   subject: "Password reset token",
    //   message,
    // });

    return res.status(200).json({ message: "Email sent", text: message });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    return res.status(500).json({
      message: "An error occurred while requesting the password reset",
    });
  }
});

// @desc    Reset user password
// @route   POST /api/users/reset-password
// @access  Private
export const resetPassword = asyncHandler(async (req, res) => {
  const { userId, password, emailAddress, resetToken } = req.body;

  // Validate input data
  if (!userId || !password || !emailAddress || !resetToken) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find the user by email address
    const user = await User.findOne({ emailAddress });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Find the reset token in the database
    const passwordResetToken = await Token.findOne({ userId: user._id });
    if (!passwordResetToken) {
      return res
        .status(400)
        .json({ message: "Invalid or expired password reset token" });
    }

    // Validate the reset token
    const isValid = await bcrypt.compare(
      resetToken,
      passwordResetToken.refreshToken
    );
    if (!isValid) {
      return res
        .status(400)
        .json({ message: "Invalid or expired password reset token" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Update the user's password
    await User.findByIdAndUpdate(
      userId,
      { $set: { password: hash } },
      { new: true }
    );

    // Delete the reset token
    await passwordResetToken.deleteOne();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while resetting the password" });
  }
});

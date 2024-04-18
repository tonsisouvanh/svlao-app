import jwt from "jsonwebtoken";

const generateToken = (res, { userId, emailAddress, role }) => {
  // Generate access token payload
  const tokenPayload = { userId, emailAddress, role };

  // Generate access token
  const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: "3h", // Set access token expiration
  });

  // Generate refresh token
  const refreshToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: "7d", // Set refresh token expiration (optional)
  });

  // Set access token cookie
  res.cookie("accesstoken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3 * 60 * 60 * 1000, // 3h
  });

  // Set refresh token cookie (consider HttpOnly flag and secure storage based on your security needs)
  res.cookie("refreshtoken", refreshToken, {
    httpOnly: true, // Consider enabling HttpOnly flag for added security
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (optional)
  });

  return { accessToken, refreshToken };
};

export default generateToken;

import jwt from "jsonwebtoken";

const WEBSITE_NAME = "laostudent";

const generateToken = (res, { userId, emailAddress, role }) => {
  try {
    // Generate access token payload
    const tokenPayload = { userId, emailAddress, role };

    // Generate access token
    const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      // expiresIn: "3h", // Set access token expiration
      expiresIn: "3h", // Set access token expiration
    });
    // Generate refresh token
    const refreshToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      // expiresIn: "7d", // Set refresh token expiration (optional)
      expiresIn: "7d", // Set refresh token expiration (optional)
    });
    // Generate unique cookie names using the website name
    const accessTokenCookieName = process.env.ACCESSTOKEN_COOKIE_NAME;
    const refreshTokenCookieName = process.env.REFRESHTOKEN_COOKIE_NAME;

    // Set access token cookie
    res.cookie(accessTokenCookieName, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 3), // 3h
      // expires: new Date(Date.now() + 5 * 1000),
      sameSite: "Strict", // or "Lax" depending on your requirements
    });

    // Set refresh token cookie (consider HttpOnly flag and secure storage based on your security needs)
    res.cookie(refreshTokenCookieName, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      // expires: new Date(Date.now() + 10 * 1000),
      sameSite: "Strict", // or "Lax" depending on your requirements
      path: "/", // specify the path if needed
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new Error("Token generation failed");
  }
};

export default generateToken;

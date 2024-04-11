import jwt from "jsonwebtoken";
//TODO: do reset token
const generateToken = (res, { userId, emailAddress, role }) => {
  const token = jwt.sign(
    { userId, emailAddress, role },
    process.env.JWT_SECRET,
    {
      expiresIn: "3h",
    }
  );
  res.cookie("accesstoken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3 * 60 * 60 * 1000, // 3h
  });
};

export default generateToken;

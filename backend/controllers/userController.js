import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import Token from "../models/tokenModel.js";
import {
  deleteImage,
  extractImageId,
  uploadSingleImage,
} from "../utils/imageUpload.js";
const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
  folder: "/laostudenthcm/users",
  transformation: { quality: "50" },
};

const handleSingleImageUpload = async (image) => {
  if (
    Array.isArray(image) &&
    image.length > 0 &&
    image[0].startsWith("data:")
  ) {
    const imageUrl = await uploadSingleImage(image[0], opts);
    return imageUrl;
  } else {
    return image;
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/resetPassword
// @access  Private
const resetPassword = asyncHandler(async (req, res) => {
  const { userId, password, emailAddress } = req.body;
  // reset token
  const user = await User.findOne({ emailAddress });
  if (!user) throw new Error("User does not exist");
  let tokenObj = await Token.findOne({ userId: user._id });
  if (tokenObj) await tokenObj.deleteOne();

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hashToken = await bcrypt.hash(
    resetToken,
    Number(process.env.JWT_SECRET)
  );

  await new Token({
    userId: user._id,
    token: hashToken,
    createdAt: Date.now(),
  }).save();

  // reset password
  let passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }
  const isValid = await bcrypt.compare(resetToken, passwordResetToken.token);
  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  await User.findByIdAndUpdate(
    userId,
    { $set: { password: hash } },
    { new: true }
  );
  await passwordResetToken.deleteOne();

  res.json({
    message: "Password reset successful",
  });
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { emailAddress, password } = req.body;
  const user = await User.findOne({ emailAddress }).populate(
    "university.universityId"
  );
  if (user && (await user.matchPassword(password))) {
    const { password, ...userWithoutPassword } = user._doc;

    res.json({
      ...userWithoutPassword,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, emailAddress, password } = req.body;

  const userExists = await User.findOne({ emailAddress });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    fullname,
    emailAddress,
    password,
  });
  if (user) {
    const { password, ...userWithoutPassword } = user._doc;
    // const token = generateToken(user._id);

    // await Token.create({
    //   userId: user._id,
    //   token: token,
    // });

    res.status(201).json({
      _id: user._id,
      ...userWithoutPassword,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Create a new user
// @route   POST /api/users/create
// @access  private
const createUser = asyncHandler(async (req, res) => {
  const { emailAddress, profileImg } = req.body;
  const userExists = await User.findOne({ emailAddress });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  let addImage = await handleSingleImageUpload(profileImg);
  const user = await User.create({
    ...req.body,
    profileImg:
      Array.isArray(profileImg) && profileImg.length > 0 ? addImage : "",
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      ...user._doc,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// * @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "university.universityId"
  );

  if (user) {
    res.json({
      _id: user._id,
      ...user._doc,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// * @access  Private
//TODO: do update with image upload
const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { role, userStatus, ...updatedUserData } = req.body; //extract role out
  const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
    new: true,
  });
  if (updatedUser) {
    res.json({ ...updatedUser._doc, token: generateToken(updatedUser._id) });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const searchFields = [
    "studentId",
    "emailAddress",
    "fullname.englishFirstname",
    "phone.phoneNumber",
  ];
  const keyword = req.query.keyword
    ? req.query.keyword !== "all"
      ? {
          $or: searchFields.map((field) => ({
            [field]: {
              $regex: req.query.keyword,
              $options: "i",
            },
          })),
        }
      : req.query.keyword
    : {};

  const count = await User.countDocuments({ ...keyword });
  const users =
    keyword === "all"
      ? await User.find({}).populate("university.universityId")
      : await User.find({ ...keyword })
          .populate("university.universityId")
          .limit(pageSize)
          .skip(pageSize * (page - 1));
  res.json({ users, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await User.deleteOne({ _id: req.params.id });
    const imageId = extractImageId(user.profileImg);
    await deleteImage(imageId, opts);
    res.json({ _id: req.params.id });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
//* @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
//* @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { profileImg, ...updatedUserData } = req.body;

  const existingUser = await User.findById(userId);
  if (!existingUser) {
    res.status(404);
    throw new Error("User not found");
  }

  // delete existing image
  if (profileImg[0].startsWith("data:")) {
    const imageId = extractImageId(existingUser.profileImg);
    if (imageId) {
      await deleteImage(imageId);
    }
  }

  // upload new image
  let addImage;
  if (Array.isArray(profileImg) && profileImg.length > 0) {
    addImage = await handleSingleImageUpload(profileImg);
  } else addImage = profileImg;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { ...updatedUserData, profileImg: addImage },
    {
      new: true,
    }
  );
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  createUser,
  resetPassword,
};

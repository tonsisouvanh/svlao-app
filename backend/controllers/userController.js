import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import {
  deleteImage,
  extractImageId,
  uploadSingleImage,
} from "../utils/imageUpload.js";
import generateToken from "../utils/generateToken.js";
import { userSchema } from "../validators/userValidators.js";
import { hashPassword } from "../../frontend/src/utils/utils.js";
import Joi from "joi";

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
  folder: "/laostudenthcm/users",
  transformation: { quality: "50" },
};

const registerSchema = Joi.object({
  fullname: Joi.string().required(),
  emailAddress: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().strict(),
});

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

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, emailAddress, password, confirmPassword } = req.body;

  const { error } = registerSchema.validate({
    fullname,
    emailAddress,
    password,
    confirmPassword,
  });
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  // Check if the user already exists
  const userExists = await User.findOne({ emailAddress });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create a new user
  const user = await User.create({
    fullname,
    emailAddress,
    password: hashedPassword,
  });

  if (user) {
    // Generate token and set it to cookies
    const { refreshToken } = generateToken(res, {
      userId: user._id,
      emailAddress: user.emailAddress,
      role: user.role,
    });

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      emailAddress: user.emailAddress,
      profileImg: user.profileImg,
      role: user.role,
    });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

// @desc    Create a new user
// @route   POST /api/users/create
// @access  private
const createUser = asyncHandler(async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  const { emailAddress, profileImg, dob } = req.body;
  const userExists = await User.findOne({ emailAddress });

  if (userExists) {
    res.status(400);
    throw new Error("User or Email already exists");
  }
  let addImage = await handleSingleImageUpload(profileImg);
  const defaultPasswordByDob = dob.toString().replace(/-/g, "");
  const hashedPassword = await hashPassword(
    defaultPasswordByDob || import.meta.VITE_DEFAULT_USER_PASSWORD
  );
  const user = await User.create({
    ...req.body,
    password: hashedPassword,
    profileImg: "",
    // Array.isArray(profileImg) && profileImg.length > 0 ? addImage : "",
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      ...user._doc,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/session
// * @access  Private
const getUserSession = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );

    if (user) {
      res.json({
        emailAddress: user.emailAddress,
        laoName: user.fullname.laoName,
        profileImg: user.profileImg,
        role: user.role,
        _id: user._id,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Server error");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// * @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("university.universityId")
    .select("-password -refreshToken");

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
const updateUserProfile = asyncHandler(async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  const userId = req.params.id;
  const { profileImg, role, ...updatedUserData } = req.body;
  const existingUser = await User.findById(userId);

  if (!existingUser) {
    res.status(404);
    throw new Error("User not found");
  }

  // delete existing image
  // if (profileImg[0].startsWith("data:")) {
  if (
    profileImg &&
    Array.isArray(profileImg) &&
    profileImg[0].startsWith("data:")
  ) {
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
    res.json({ ...updatedUser._doc });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 50;
  const page = Number(req.query.page) || 1;
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
  res.json({ users, page, pages: Math.ceil(count / pageSize), total: count });
});

// @desc    Get filtered users
// @route   GET /api/users/filter
// @access  Private/Admin
// @desc    Get filtered users
// @route   GET /api/users/filter
// @access  Private/Admin
const getFilteredUsers = asyncHandler(async (req, res) => {
  const { ...filters } = req.query;
  // Construct the filter object based on the provided parameters
  const filterObject = {};

  // Iterate through the filters and add them to the filterObject
  Object.keys(filters).forEach((key) => {
    filterObject[key] = filters[key];
  });
  // Fetch users based on the filters and pagination
  const users = await User.find(filterObject);

  res.json({
    users,
    total: await User.countDocuments(filterObject),
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await User.deleteOne({ _id: req.params.id });
    const imageId = extractImageId(user.profileImg);
    if (imageId) await deleteImage(imageId, opts);
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
  const { error } = userSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
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

// @desc    Update user
// @route   PUT /api/users-stats?filter=all
//* @access  Private/Admin
const getUserStats = asyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

export {
  getFilteredUsers,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  createUser,
  getUserSession,
};

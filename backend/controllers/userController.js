import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

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
  const { emailAddress, password } = req.body;

  const userExists = await User.findOne({ emailAddress });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    ...req.body,
  });
  if (user) {
    // const { password, ...userWithoutPassword } = user._doc;
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

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
// const getUsers = asyncHandler(async (req, res) => {
//   const pageSize = 10;
//   const page = Number(req.query.pageNumber) || 1;

//   const searchFields = [
//     "_id",
//     "studentId",
//     "emailAddress",
//     "fullname.englishFirstname",
//   ]; // Add more fields as needed
//   let keyword;
//   if (req.query.keyword) {
//     if (req.query.keyword === "all") {
//       keyword === "all";
//     } else {
//       keyword = {
//         $or: searchFields.map((field) => ({
//           [field]: {
//             $regex: req.query.keyword,
//             $options: "i",
//           },
//         })),
//       };
//     }
//   } else keyword = {};
//   const count = await User.countDocuments({ ...keyword });

//   const users = await User.find({ ...keyword })
//     .limit(pageSize)
//     .skip(pageSize * (page - 1));
//   // const users =
//   //   keyword === "all"
//   //     ? await User.find({})
//   //     : await User.find({ ...keyword })
//   //         .limit(pageSize)
//   //         .skip(pageSize * (page - 1));
//   res.json({ users, page, pages: Math.ceil(count / pageSize) });
// });

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
      ? await User.find({})
      : await User.find({ ...keyword })
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
  const updatedUserData = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { ...updatedUserData },
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
};

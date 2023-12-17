import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import University from "../models/universityModel.js";

// @desc    Auth university & get token
// @route   POST /api/universitys/login
// @access  Public
const authUniversity = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const university = await University.findOne({ email });

  if (university && (await university.matchPassword(password))) {
    res.json({
      _id: university._id,
      fullname: university.fullname,
      email: university.email,
      role: university.role,
      isActive: university.isActive,
      token: generateToken(university._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new university
// @route   POST /api/universitys
// @access  Public
const registerUniversity = asyncHandler(async (req, res) => {
  const { fullname, email, password, image } = req.body;

  const universityExists = await University.findOne({ email });

  if (universityExists) {
    res.status(400);
    throw new Error("University already exists");
  }

  const university = await University.create({
    fullname,
    email,
    password,
    image,
  });

  if (university) {
    res.status(201).json({
      _id: university._id,
      fullname: university.fullname,
      email: university.email,
      role: university.role,
      token: generateToken(university._id),
      image: university.image,
      isActive: university.isActive,
    });
  } else {
    res.status(400);
    throw new Error("Invalid university data");
  }
});

// @desc    Get university profile
// @route   GET /api/universitys/profile
// * @access  Private
const getUniversityProfile = asyncHandler(async (req, res) => {
  const university = await University.findById(req.university._id).populate(
    "university.universityId"
  );

  if (university) {
    res.json({
      _id: university._id,
      ...university._doc,
    });
  } else {
    res.status(404);
    throw new Error("University not found");
  }
});

// @desc    Update university profile
// @route   PUT /api/universitys/profile
// * @access  Private
const updateUniversityProfile = asyncHandler(async (req, res) => {
  const universityId = req.university._id;
  const updatedUniversityData = req.body;
  const updatedUniversity = await University.findByIdAndUpdate(universityId, updatedUniversityData, {
    new: true,
  });
  if (updatedUniversity) {
    res.json({ ...updatedUniversity._doc, token: generateToken(updatedUniversity._id) });
  } else {
    res.status(404);
    throw new Error("University not found");
  }
});

// @desc    Get all universitys
// @route   GET /api/universitys
// @access  Private/Admin
const getUniversitys = asyncHandler(async (req, res) => {
  const universitys = await University.find({});
  res.json(universitys);
});

// @desc    Delete university
// @route   DELETE /api/universitys/:id
// @access  Private/Admin
const deleteUniversity = asyncHandler(async (req, res) => {
  const university = await University.findById(req.params.id);

  if (university) {
    await University.deleteOne({ _id: req.params.id });
    res.json({ message: "University removed" });
  } else {
    res.status(404);
    throw new Error("University not found");
  }
});

// @desc    Get university by ID
// @route   GET /api/universitys/:id
//* @access  Private/Admin
const getUniversityById = asyncHandler(async (req, res) => {
  const university = await University.findById(req.params.id).select("-password");

  if (university) {
    res.json(university);
  } else {
    res.status(404);
    throw new Error("University not found");
  }
});

// @desc    Update university
// @route   PUT /api/universitys/:id
//* @access  Private/Admin
const updateUniversity = asyncHandler(async (req, res) => {
  const universityId = req.params.id;
  const updatedUniversityData = req.body;
  const updatedUniversity = await University.findByIdAndUpdate(universityId, updatedUniversityData, {
    new: true,
  });
  if (updatedUniversity) {
    res.json(updatedUniversity);
  } else {
    res.status(404);
    throw new Error("University not found");
  }
});

export {
  authUniversity,
  registerUniversity,
  getUniversityProfile,
  updateUniversityProfile,
  getUniversitys,
  deleteUniversity,
  getUniversityById,
  updateUniversity,
};

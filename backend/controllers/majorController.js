import asyncHandler from "express-async-handler";
import Major from "../models/majorModel.js";

// @desc    Get all majors
// @route   GET /api/majors
// @access  Private/Admin
const getMajors = asyncHandler(async (req, res) => {
  const majors = await Major.find({});
  res.json(majors);
});

// @desc    Delete major
// @route   DELETE /api/majors/:id
// @access  Private/Admin
const deleteMajor = asyncHandler(async (req, res) => {
  const major = await Major.findById(req.params.id);

  if (major) {
    await Major.deleteOne({ _id: req.params.id });
    res.json({ message: "Major removed" });
  } else {
    res.status(404);
    throw new Error("Major not found");
  }
});

// @desc    Get major by ID
// @route   GET /api/majors/:id
//* @access  Private/Admin
const getMajorById = asyncHandler(async (req, res) => {
  const major = await Major.findById(req.params.id).select("-password");

  if (major) {
    res.json(major);
  } else {
    res.status(404);
    throw new Error("Major not found");
  }
});

// @desc    Update major
// @route   PUT /api/majors/:id
//* @access  Private/Admin
const updateMajor = asyncHandler(async (req, res) => {
  const majorId = req.params.id;
  const updatedMajorData = req.body;
  const updatedMajor = await Major.findByIdAndUpdate(
    majorId,
    updatedMajorData,
    {
      new: true,
    }
  );
  if (updatedMajor) {
    res.json(updatedMajor);
  } else {
    res.status(404);
    throw new Error("Major not found");
  }
});

export { getMajors, deleteMajor, getMajorById, updateMajor };

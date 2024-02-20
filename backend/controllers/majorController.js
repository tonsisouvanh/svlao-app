import asyncHandler from "express-async-handler";
import Major from "../models/majorModel.js";

// @desc    Update major profile
// @route   PUT /api/majors
// * @access  Private
const updateMajor = asyncHandler(async (req, res) => {
  const majorId = req.params.id;
  const { laoMajor, vietMajor } = req.body;

  // Check if the document with the given ID exists
  const existingMajor = await Major.findById(majorId);

  if (!existingMajor) {
    res.status(404);
    throw new Error("Major not found");
  }

  const updatedMajor = await Major.findByIdAndUpdate(
    majorId,
    { laoMajor, vietMajor },
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

// @desc    Create a new major
// @route   POST /api/universities
// @access  Private
const createMajor = asyncHandler(async (req, res) => {
  const { vietMajor, laoMajor } = req.body;

  // Check if the major with the given English name already exists
  const majorExist = await Major.findOne({ vietMajor });

  if (majorExist) {
    res.status(400);
    throw new Error("Major already exists");
  }

  // Create a new major
  const major = await Major.create({
    vietMajor,
    laoMajor,
  });

  if (major) {
    res.status(201).json({
      _id: major._id,
      laoMajor: major.laoMajor,
      vietMajor: major.vietMajor,
    });
  } else {
    res.status(400);
    throw new Error("Invalid major data");
  }
});

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
    res.json({ _id: req.params.id });
  } else {
    res.status(404);
    throw new Error("Major not found");
  }
});

// @desc    Get major by ID
// @route   GET /api/majors/:id
//* @access  Private/Admin
const getMajorById = asyncHandler(async (req, res) => {
  const major = await Major.findById(req.params.id);
  if (major) {
    res.json(major);
  } else {
    res.status(404);
    throw new Error("Major not found");
  }
});

export { getMajors, deleteMajor, getMajorById, updateMajor, createMajor };

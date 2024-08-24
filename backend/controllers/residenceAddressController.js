import asyncHandler from "express-async-handler";
import ResidenceAddress from "../models/residenceAddressModel.js";
import Joi from "joi";

const residenceAddressSchema = Joi.object({
  address: Joi.string().required(),
  location: Joi.string().required(),
});

// @desc    Update residence address profile
// @route   PUT /api/residenceAddresses/:id
// @access  Private
const updateResidenceAddress = asyncHandler(async (req, res) => {
  const residenceAddressId = req.params.id;
  const { address, location } = req.body;

  // Validate request body
  const { error } = residenceAddressSchema.validate({ address, location });
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  // Check if the document with the given ID exists
  const existingResidenceAddress = await ResidenceAddress.findById(
    residenceAddressId
  );

  if (!existingResidenceAddress) {
    res.status(404);
    throw new Error("Residence Address not found");
  }

  const updatedResidenceAddress = await ResidenceAddress.findByIdAndUpdate(
    residenceAddressId,
    { address, location },
    {
      new: true,
    }
  );
  if (updatedResidenceAddress) {
    res.json(updatedResidenceAddress);
  } else {
    res.status(404);
    throw new Error("Residence Address not found");
  }
});

// @desc    Create a new residence address
// @route   POST /api/residenceAddresses
// @access  Private
const createResidenceAddress = asyncHandler(async (req, res) => {
  const { address, location } = req.body;

  // Validate request body
  const { error } = residenceAddressSchema.validate({ address, location });
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  // Check if the residence address with the given address already exists
  const residenceAddressExist = await ResidenceAddress.findOne({ address });

  if (residenceAddressExist) {
    res.status(400);
    throw new Error("Residence Address already exists");
  }

  // Create a new residence address
  const residenceAddress = await ResidenceAddress.create({
    address,
    location,
  });

  if (residenceAddress) {
    res.status(201).json({
      _id: residenceAddress._id,
      address: residenceAddress.address,
      location: residenceAddress.location,
    });
  } else {
    res.status(400);
    throw new Error("Invalid residence address data");
  }
});

// @desc    Get all residence addresses
// @route   GET /api/residenceAddresses
// @access  Private/Admin
const getResidenceAddresses = asyncHandler(async (req, res) => {
  const residenceAddresses = await ResidenceAddress.find({});
  res.json(residenceAddresses);
});

// @desc    Delete residence address
// @route   DELETE /api/residenceAddresses/:id
// @access  Private/Admin
const deleteResidenceAddress = asyncHandler(async (req, res) => {
  const residenceAddress = await ResidenceAddress.findById(req.params.id);
  if (residenceAddress) {
    await ResidenceAddress.deleteOne({ _id: req.params.id });
    res.json({ _id: req.params.id });
  } else {
    res.status(404);
    throw new Error("Residence Address not found");
  }
});

// @desc    Get residence address by ID
// @route   GET /api/residenceAddresses/:id
// @access  Private/Admin
const getResidenceAddressById = asyncHandler(async (req, res) => {
  const residenceAddress = await ResidenceAddress.findById(req.params.id);
  if (residenceAddress) {
    res.json(residenceAddress);
  } else {
    res.status(404);
    throw new Error("Residence Address not found");
  }
});

export {
  getResidenceAddresses,
  deleteResidenceAddress,
  getResidenceAddressById,
  updateResidenceAddress,
  createResidenceAddress,
};

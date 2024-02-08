import asyncHandler from "express-async-handler";
import ResidenceAddress from "../models/residenceAddressModel.js";

// @desc    Update residenceAddress profile
// @route   PUT /api/residenceAddresss
// * @access  Private
const updateResidenceAddress = asyncHandler(async (req, res) => {
  const residenceAddressId = req.params.id;
  const { address, location } = req.body;

  const existingResidenceAddress = await ResidenceAddress.findById(
    residenceAddressId
  );

  if (!existingResidenceAddress) {
    res.status(404);
    throw new Error("ResidenceAddress not found");
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

// @desc    Create a new residenceAddress
// @route   POST /api/universities
// @access  Private
const createResidenceAddress = asyncHandler(async (req, res) => {
  const { address, location } = req.body;

  const residenceAddressExist = await ResidenceAddress.findOne({ address });

  if (residenceAddressExist) {
    res.status(400);
    throw new Error("Residence Address already exists");
  }

  // Create a new residenceAddress
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
    throw new Error("Invalid residence Address data");
  }
});

// @desc    Get all residenceAddresss
// @route   GET /api/residenceAddresss
// @access  Private/Admin
const getResidenceAddresses = asyncHandler(async (req, res) => {
  const residenceAddresses = await ResidenceAddress.find({});
  res.json(residenceAddresses);
});

// @desc    Delete residenceAddress
// @route   DELETE /api/residenceAddresss/:id
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

// @desc    Get residenceAddress by ID
// @route   GET /api/residenceAddresss/:id
//* @access  Private/Admin
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

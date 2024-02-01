import mongoose from "mongoose";

const residenceAddressSchema = mongoose.Schema(
  {
    address: {
      type: String,
    },
    location: { type: String },
  },
  { timestamps: true }
);

const ResidenceAddress = mongoose.model(
  "ResidenceAddress",
  residenceAddressSchema
);

export default ResidenceAddress;

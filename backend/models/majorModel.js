import mongoose from "mongoose";

const majorSchema = mongoose.Schema(
  {
    vietMajor: {
      type: String,
    },
    laoMajor: { type: String },
  },
  { timestamps: true }
);

const Major = mongoose.model("Major", majorSchema);

export default Major;

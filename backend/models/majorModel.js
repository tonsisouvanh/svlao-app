import mongoose from "mongoose";

const majorSchema = mongoose.Schema(
  {
    vietMajor: {
      type: String,
      require: true,
    },
    laoMajor: { type: String, require: true },
  },
  { timestamps: true }
);

const Major = mongoose.model("Major", majorSchema);

export default Major;

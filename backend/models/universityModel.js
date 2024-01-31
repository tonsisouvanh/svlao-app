import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  englishName: {
    type: String,
    required: true,
  },
  vietName: String,
  laoName: String,
  shortcut: {
    type: String,
    required: true,
    unique: true,
  },
});

const University = mongoose.model("University", universitySchema);

export default University;

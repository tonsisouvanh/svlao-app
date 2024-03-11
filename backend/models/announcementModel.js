import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    default: ["Event"],
  },
  image: {
    type: String,
    default: "http://#",
  },
  views: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;

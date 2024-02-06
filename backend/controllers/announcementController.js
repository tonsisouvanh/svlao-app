import asyncHandler from "express-async-handler";
import Announcement from "../models/announcementModel.js";

// @desc    Insert multiple announcements
// @route   POST /api/announcements/insertMany
// @access  Private/Admin
const insertManyAnnouncements = asyncHandler(async (req, res) => {
  const announcementsData = req.body; // Assuming req.body is an array of announcements

  try {
    // Insert the array of announcements
    const insertedAnnouncements = await Announcement.insertMany(
      announcementsData
    );

    res.status(201).json(insertedAnnouncements);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error inserting announcements", error: error.message });
  }
});

// @desc    Update announcement
// @route   PUT /api/announcements/:id
// @access  Private/Admin
const updateAnnouncement = asyncHandler(async (req, res) => {
  const announcementId = req.params.id;
  const { title, content, category, image } = req.body;

  const updatedAnnouncement = await Announcement.findByIdAndUpdate(
    announcementId,
    { title, content, category, image },
    {
      new: true,
    }
  );

  if (updatedAnnouncement) {
    res.json(updatedAnnouncement);
  } else {
    res.status(404);
    throw new Error("Announcement not found");
  }
});

// @desc    Create a new announcement
// @route   POST /api/announcements
// @access  Private/Admin
const createAnnouncement = asyncHandler(async (req, res) => {
  const { title, content, category, image } = req.body;

  // Check if the announcement with the given title already exists
  const announcementExist = await Announcement.findOne({ title });

  if (announcementExist) {
    res.status(400);
    throw new Error("Announcement already exists");
  }

  // Create a new announcement
  const announcement = await Announcement.create({
    title,
    content,
    category,
    image,
  });

  if (announcement) {
    res.status(201).json({
      _id: announcement._id,
      title: announcement.title,
      content: announcement.content,
      category: announcement.category,
      image: announcement.image,
    });
  } else {
    res.status(400);
    throw new Error("Invalid announcement data");
  }
});

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Private/Admin
const getAnnouncements = asyncHandler(async (req, res) => {
  const announcements = await Announcement.find({});
  res.json(announcements);
});

// @desc    Delete announcement
// @route   DELETE /api/announcements/:id
// @access  Private/Admin
const deleteAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);
  if (announcement) {
    await Announcement.deleteOne({ _id: req.params.id });
    res.json({ _id: req.params.id });
  } else {
    res.status(404);
    throw new Error("Announcement not found");
  }
});

// @desc    Get announcement by ID
// @route   GET /api/announcements/:id
// @access  Private/Admin
const getAnnouncementById = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);
  if (announcement) {
    res.json(announcement);
  } else {
    res.status(404);
    throw new Error("Announcement not found");
  }
});

export {
  getAnnouncements,
  deleteAnnouncement,
  getAnnouncementById,
  updateAnnouncement,
  createAnnouncement,
  insertManyAnnouncements
};

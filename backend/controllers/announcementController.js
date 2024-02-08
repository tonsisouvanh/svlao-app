import asyncHandler from "express-async-handler";
import Announcement from "../models/announcementModel.js";
import { uploadSingleImage } from "../utils/imageUpload.js";
const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
  folder: "/laostudenthcm/announcement",
  transformation: { quality: "50" },
};

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
  console.log("🚀 ~ createAnnouncement ~ req.body:", req.body)
  let addImage = [];

  if (image?.length > 0) {
    const imageUrl = await uploadSingleImage(image[0], opts);
    addImage = imageUrl;
  }
  const announcementExist = await Announcement.findOne({ title });

  if (announcementExist) {
    res.status(400);
    throw new Error("Announcement already exists");
  }

  const announcement = await Announcement.create({
    title,
    content,
    category,
    image: addImage || "",
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
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const searchFields = ["title", "content", "category"];
  const keyword = req.query.keyword
    ? req.query.keyword !== "all"
      ? {
          $or: searchFields.map((field) => ({
            [field]: {
              $regex: req.query.keyword,
              $options: "i",
            },
          })),
        }
      : req.query.keyword
    : {};

  const count = await Announcement.countDocuments({ ...keyword });
  const announcements =
    keyword === "all"
      ? await Announcement.find({})
      : await Announcement.find({ ...keyword })
          .limit(pageSize)
          .skip(pageSize * (page - 1));

  res.json({ announcements, page, pages: Math.ceil(count / pageSize) });
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
  insertManyAnnouncements,
};

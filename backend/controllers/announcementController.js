import asyncHandler from "express-async-handler";
import Announcement from "../models/announcementModel.js";
import {
  deleteImage,
  extractImageId,
  uploadSingleImage,
} from "../utils/imageUpload.js";
const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
  folder: "/laostudenthcm/announcement",
  transformation: { quality: "50" },
};

const handleSingleImageUpload = async (image) => {
  if (
    Array.isArray(image) &&
    image.length > 0 &&
    image[0].startsWith("data:")
  ) {
    const imageUrl = await uploadSingleImage(image[0], opts);
    return imageUrl;
  } else {
    return image;
  }
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
  const announcementExist = await Announcement.findById(announcementId);

  if (!announcementExist) {
    res.status(404);
    throw new Error("Announcement not found");
  }

  // check to delete image and replace new one
  if (image[0].startsWith("data:")) {
    const imageId = extractImageId(announcementExist.image);
    if (imageId) {
      await deleteImage(imageId);
    }
  }
  // if image is array and length > 0, then upload new image
  let addImage;
  if (Array.isArray(image) && image.length > 0) {
    addImage = await handleSingleImageUpload(image);
  } else addImage = image;

  const updatedAnnouncement = await Announcement.findByIdAndUpdate(
    announcementId,
    {
      title,
      content,
      category,
      image: addImage,
      // image: Array.isArray(image) && image.length > 0 ? addImage : image,
    },
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
  let addImage = await handleSingleImageUpload(image);
  const announcementExist = await Announcement.findOne({ title });
  if (announcementExist) {
    res.status(400);
    throw new Error("Announcement already exists");
  }
  const announcement = await Announcement.create({
    title,
    content,
    category,
    image: Array.isArray(image) && image.length > 0 ? addImage : "",
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
    const imageId = extractImageId(announcement.image);
    if (imageId) {
      await deleteImage(imageId, opts);
    }
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

const countViews = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);
  if (announcement) {
    announcement.views += 1;
    await announcement.save();
    res.json({ views: announcement.views, announcementId: announcement._id });
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
  countViews,
};

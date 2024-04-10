import express from "express";
const router = express.Router();
import {
  getAnnouncements,
  deleteAnnouncement,
  getAnnouncementById,
  updateAnnouncement,
  createAnnouncement,
  insertManyAnnouncements,
  countViews,
  getAnnouncementImages,
} from "../controllers/announcementController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(protect, admin, createAnnouncement)
  .get(getAnnouncements);
router.route("/createMany").post(protect, admin, insertManyAnnouncements);
router.route("/images").get(getAnnouncementImages);
router
  .route("/:id")
  .delete(protect, admin, deleteAnnouncement)
  .get(getAnnouncementById)
  .put(protect, admin, updateAnnouncement)
  .post(countViews);

export default router;

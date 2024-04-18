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
import { verifyJWT, authorizeUserAdmin } from "../middleware/authMiddleware.js";
import role from "../utils/role.js";
router
  .route("/")
  .post(verifyJWT, authorizeUserAdmin(role.Admin), createAnnouncement)
  .get(getAnnouncements);
router
  .route("/createMany")
  .post(verifyJWT, authorizeUserAdmin(role.Admin), insertManyAnnouncements);
router.route("/images").get(getAnnouncementImages);
router
  .route("/:id")
  .delete(verifyJWT, authorizeUserAdmin(role.Admin), deleteAnnouncement)
  .get(getAnnouncementById)
  .put(verifyJWT, authorizeUserAdmin(role.Admin), updateAnnouncement)
  .post(countViews);

export default router;

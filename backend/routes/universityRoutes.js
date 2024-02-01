import express from "express";
const router = express.Router();
import {
  createUniversity,
  deleteUniversity,
  getUniversities,
  getUniversityById,
  updateUniversity,
} from "../controllers/universityController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, admin, createUniversity).get(getUniversities);
router
  .route("/:id")
  .delete(protect, admin, deleteUniversity)
  .get(getUniversityById)
  .put(protect, admin, updateUniversity);

export default router;

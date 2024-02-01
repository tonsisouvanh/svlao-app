import express from "express";
const router = express.Router();
import {
  getMajors,
  deleteMajor,
  getMajorById,
  updateMajor,
  createMajor,
} from "../controllers/majorController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, admin, createMajor).get(getMajors);
router
  .route("/:id")
  .delete(protect, admin, deleteMajor)
  .get(getMajorById)
  .put(protect, admin, updateMajor);

export default router;

import express from "express";
const router = express.Router();
import {
  createUniversity,
  deleteUniversity,
  getUniversities,
  getUniversityById,
  updateUniversity,
} from "../controllers/universityController.js";
import { protect, authorizeUserAdmin } from "../middleware/authMiddleware.js";
import role from "../utils/role.js";
router
  .route("/")
  .post(protect, authorizeUserAdmin(role.Admin), createUniversity)
  .get(getUniversities);
router
  .route("/:id")
  .delete(protect, authorizeUserAdmin(role.Admin), deleteUniversity)
  .get(getUniversityById)
  .put(protect, authorizeUserAdmin(role.Admin), updateUniversity);

export default router;

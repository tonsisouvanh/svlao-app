import express from "express";
const router = express.Router();
import {
  getMajors,
  deleteMajor,
  getMajorById,
  updateMajor,
  createMajor,
} from "../controllers/majorController.js";
import { protect, authorizeUserAdmin } from "../middleware/authMiddleware.js";
import role from "../utils/role.js";

router.route("/").post(protect, authorizeUserAdmin(role.Admin), createMajor).get(getMajors);
router
  .route("/:id")
  .delete(protect, authorizeUserAdmin(role.Admin), deleteMajor)
  .get(getMajorById)
  .put(protect, authorizeUserAdmin(role.Admin), updateMajor);

export default router;

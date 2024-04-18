import express from "express";
const router = express.Router();
import {
  createUniversity,
  deleteUniversity,
  getUniversities,
  getUniversityById,
  updateUniversity,
} from "../controllers/universityController.js";
import { verifyJWT, authorizeUserAdmin } from "../middleware/authMiddleware.js";
import role from "../utils/role.js";
router
  .route("/")
  .post(verifyJWT, authorizeUserAdmin(role.Admin), createUniversity)
  .get(getUniversities);
router
  .route("/:id")
  .delete(verifyJWT, authorizeUserAdmin(role.Admin), deleteUniversity)
  .get(getUniversityById)
  .put(verifyJWT, authorizeUserAdmin(role.Admin), updateUniversity);

export default router;

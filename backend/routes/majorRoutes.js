import express from "express";
const router = express.Router();
import {
  getMajors,
  deleteMajor,
  getMajorById,
  updateMajor,
  createMajor,
} from "../controllers/majorController.js";
import { verifyJWT, authorizeUserAdmin } from "../middleware/authMiddleware.js";
import role from "../utils/role.js";

router
  .route("/")
  .post(verifyJWT, authorizeUserAdmin(role.Admin), createMajor)
  .get(getMajors);
router
  .route("/:id")
  .delete(verifyJWT, authorizeUserAdmin(role.Admin), deleteMajor)
  .get(getMajorById)
  .put(verifyJWT, authorizeUserAdmin(role.Admin), updateMajor);

export default router;

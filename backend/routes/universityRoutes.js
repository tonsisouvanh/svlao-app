import express from "express";
const router = express.Router();
import {
  createUniversity,
  getUniversities,
} from "../controllers/universityController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(createUniversity).get(getUniversities);
// router.post('/login', authUniversity)
// router
//   .route('/profile')
//   .get(protect, getUniversityProfile)
//   .put(protect, updateUniversityProfile)
// router
//   .route('/:id')
//   .delete(protect, admin, deleteUniversity)
//   .get(protect, admin, getUniversityById)
//   .put(protect, admin, updateUniversity)

export default router;

import express from "express";
const router = express.Router();
import {
  authUniversity,
  registerUniversity,
  getUniversityProfile,
  updateUniversityProfile,
  getUniversitys,
  deleteUniversity,
  getUniversityById,
  updateUniversity,
} from "../controllers/universityController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUniversity).get(getUniversitys);
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

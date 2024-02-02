import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  createUser,
  resetPassword,
} from "../controllers/userController.js";
import {
  protect,
  admin,
  activeUserCheck,
} from "../middleware/authMiddleware.js";

router.post("/create", protect, admin, createUser);
router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/reset-password").post(protect, admin, resetPassword);
router.route("/login").post(activeUserCheck, authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;

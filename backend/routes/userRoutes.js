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
  getFilteredUsers,
  logoutUser,
} from "../controllers/userController.js";
import {
  protect,
  activeUserCheck,
  authorizeUserAdmin,
} from "../middleware/authMiddleware.js";
import role from "../utils/role.js";


router.post("/logout", logoutUser);
router.post("/create", protect, authorizeUserAdmin(role.Admin), createUser);
router.get(
  "/filter",
  protect,
  authorizeUserAdmin(role.Admin),
  getFilteredUsers
);
router.post(
  "/resetPassword",
  protect,
  authorizeUserAdmin(role.Admin),
  resetPassword
);
router
  .route("/")
  .post(registerUser)
  .get(protect, authorizeUserAdmin(role.Admin), getUsers);
router.route("/login").post(activeUserCheck, authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, authorizeUserAdmin(role.Admin), deleteUser)
  .get(protect, authorizeUserAdmin(role.Admin), getUserById)
  .put(protect, authorizeUserAdmin(role.Admin), updateUser);

export default router;

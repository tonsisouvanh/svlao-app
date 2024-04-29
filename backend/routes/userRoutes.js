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
  refreshToken,
} from "../controllers/userController.js";
import {
  verifyJWT,
  activeUserCheck,
  authorizeUserAdmin,
} from "../middleware/authMiddleware.js";
import role from "../utils/role.js";

router.post("/refresh-token", refreshToken);
router.post("/logout", verifyJWT, logoutUser);
router.post("/create", verifyJWT, authorizeUserAdmin(role.Admin), createUser);
router.get(
  "/filter",
  verifyJWT,
  authorizeUserAdmin(role.Admin),
  getFilteredUsers
);
router.post(
  "/reset-password",
  verifyJWT,
  authorizeUserAdmin(role.Admin),
  resetPassword
);
router
  .route("/")
  .post(registerUser)
  .get(verifyJWT, authorizeUserAdmin(role.Admin), getUsers);
router.route("/login").post(activeUserCheck, authUser);
router
  .route("/profile")
  .get(verifyJWT, getUserProfile)
  .put(verifyJWT, updateUserProfile);
router
  .route("/:id")
  .delete(verifyJWT, authorizeUserAdmin(role.Admin), deleteUser)
  .get(verifyJWT, authorizeUserAdmin(role.Admin), getUserById)
  .put(verifyJWT, authorizeUserAdmin(role.Admin), updateUser);

export default router;

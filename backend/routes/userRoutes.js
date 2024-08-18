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
  requestResetPassword,
} from "../controllers/userController.js";
import {
  verifyJWT,
  activeUserCheck,
  authorizeUserAdmin,
} from "../middleware/authMiddleware.js";
import role from "../utils/role.js";

// Public routes
router.post("/refresh-token", refreshToken);
router.post("/request-reset-password", requestResetPassword);
router.route("/login").post(activeUserCheck, authUser);
router.route("/").post(registerUser);

// Protected routes
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
router.get("/profile", verifyJWT, getUserProfile);
router.put("/profile", verifyJWT, updateUserProfile);

// Admin routes
router
  .route("/:id")
  .delete(verifyJWT, authorizeUserAdmin(role.Admin), deleteUser)
  .get(verifyJWT, authorizeUserAdmin(role.Admin), getUserById)
  .put(verifyJWT, authorizeUserAdmin(role.Admin), updateUser);

router.get("/", verifyJWT, authorizeUserAdmin(role.Admin), getUsers);

// router.post("/refresh-token", refreshToken);
// router.post("/logout", verifyJWT, logoutUser);
// router.post("/create", verifyJWT, authorizeUserAdmin(role.Admin), createUser);
// router.get(
//   "/filter",
//   verifyJWT,
//   authorizeUserAdmin(role.Admin),
//   getFilteredUsers
// );
// router.post(
//   "/reset-password",
//   verifyJWT,
//   authorizeUserAdmin(role.Admin),
//   resetPassword
// );
// router.post("/request-reset-password", requestResetPassword);
// router
//   .route("/")
//   .post(registerUser)
//   .get(verifyJWT, authorizeUserAdmin(role.Admin), getUsers);
// router.route("/login").post(activeUserCheck, authUser);
// router
//   .route("/profile")
//   .get(verifyJWT, getUserProfile)
//   .put(verifyJWT, updateUserProfile);

// router
//   .route("/:id")
//   .delete(verifyJWT, authorizeUserAdmin(role.Admin), deleteUser)
//   .get(verifyJWT, authorizeUserAdmin(role.Admin), getUserById)
//   .put(verifyJWT, authorizeUserAdmin(role.Admin), updateUser);

export default router;

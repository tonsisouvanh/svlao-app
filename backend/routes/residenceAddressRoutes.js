import express from "express";
const router = express.Router();
import {
  deleteResidenceAddress,
  getResidenceAddressById,
  updateResidenceAddress,
  createResidenceAddress,
  getResidenceAddresses,
} from "../controllers/residenceAddressController.js";
import { protect, authorizeUserAdmin } from "../middleware/authMiddleware.js";
import role from "../utils/role.js";
router
  .route("/")
  .post(protect, authorizeUserAdmin(role.Admin), createResidenceAddress)
  .get(getResidenceAddresses);
router
  .route("/:id")
  .delete(protect, authorizeUserAdmin(role.Admin), deleteResidenceAddress)
  .get(getResidenceAddressById)
  .put(protect, authorizeUserAdmin(role.Admin), updateResidenceAddress);

export default router;

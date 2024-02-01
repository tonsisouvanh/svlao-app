import express from "express";
const router = express.Router();
import {
  deleteResidenceAddress,
  getResidenceAddressById,
  updateResidenceAddress,
  createResidenceAddress,
  getResidenceAddresses,
} from "../controllers/residenceAddressController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(protect, admin, createResidenceAddress)
  .get(getResidenceAddresses);
router
  .route("/:id")
  .delete(protect, admin, deleteResidenceAddress)
  .get(getResidenceAddressById)
  .put(protect, admin, updateResidenceAddress);

export default router;

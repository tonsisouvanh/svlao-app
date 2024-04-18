import express from "express";
const router = express.Router();
import {
  deleteResidenceAddress,
  getResidenceAddressById,
  updateResidenceAddress,
  createResidenceAddress,
  getResidenceAddresses,
} from "../controllers/residenceAddressController.js";
import { verifyJWT, authorizeUserAdmin } from "../middleware/authMiddleware.js";
import role from "../utils/role.js";
router
  .route("/")
  .post(verifyJWT, authorizeUserAdmin(role.Admin), createResidenceAddress)
  .get(getResidenceAddresses);
router
  .route("/:id")
  .delete(verifyJWT, authorizeUserAdmin(role.Admin), deleteResidenceAddress)
  .get(getResidenceAddressById)
  .put(verifyJWT, authorizeUserAdmin(role.Admin), updateResidenceAddress);

export default router;

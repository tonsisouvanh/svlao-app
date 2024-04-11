import express from "express";
const router = express.Router();
import {
  getDocuments,
  deleteDocument,
  getDocumentById,
  updateDocument,
  createDocument,
  insertManyDocuments,
} from "../controllers/documentController.js";
import { protect, authorizeUserAdmin } from "../middleware/authMiddleware.js";
import role from "../utils/role.js";
router
  .route("/")
  .post(protect, authorizeUserAdmin(role.Admin), createDocument)
  .get(getDocuments);
router
  .route("/createMany")
  .post(protect, authorizeUserAdmin(role.Admin), insertManyDocuments);
router
  .route("/:id")
  .delete(protect, authorizeUserAdmin(role.Admin), deleteDocument)
  .get(getDocumentById)
  .put(protect, authorizeUserAdmin(role.Admin), updateDocument);

export default router;

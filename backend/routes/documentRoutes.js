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
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(protect, admin, createDocument)
  .get(getDocuments);
router.route("/createMany").post(protect, admin, insertManyDocuments);
router
  .route("/:id")
  .delete(protect, admin, deleteDocument)
  .get(getDocumentById)
  .put(protect, admin, updateDocument);

export default router;

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
import { verifyJWT, authorizeUserAdmin } from "../middleware/authMiddleware.js";
import role from "../utils/role.js";
router
  .route("/")
  .post(verifyJWT, authorizeUserAdmin(role.Admin), createDocument)
  .get(getDocuments);
router
  .route("/createMany")
  .post(verifyJWT, authorizeUserAdmin(role.Admin), insertManyDocuments);
router
  .route("/:id")
  .delete(verifyJWT, authorizeUserAdmin(role.Admin), deleteDocument)
  .get(getDocumentById)
  .put(verifyJWT, authorizeUserAdmin(role.Admin), updateDocument);

export default router;

import express from "express";
const router = express.Router();
import {
  getMajors,
  deleteMajor,
  getMajorById,
  updateMajor,
} from "../controllers/majorController.js";

router.route("/").get(getMajors);

export default router;

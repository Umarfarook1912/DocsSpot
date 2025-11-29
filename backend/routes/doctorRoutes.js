import express from "express";
import {
  createDoctorProfile,
  getApprovedDoctors,
  approveDoctor
} from "../controllers/doctorController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getApprovedDoctors);
router.post("/", protect, authorizeRoles("doctor"), createDoctorProfile);
router.put("/:id/approve", protect, authorizeRoles("admin"), approveDoctor);

export default router;

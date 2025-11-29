
import express from "express";
import {
  createDoctorProfile,
  getApprovedDoctors,
  approveDoctor,
  getDoctorById,
  getMyDoctorProfile,
  updateMyDoctorProfile,
  rejectDoctor,
  getAllDoctorsAdmin
} from "../controllers/doctorController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { uploadDoctorPhoto } from "../middleware/uploadDoctorPhoto.js";

const router = express.Router();

// Doctor profile management
router.get("/me/profile", protect, authorizeRoles("doctor"), getMyDoctorProfile);
router.put("/me/profile", protect, authorizeRoles("doctor"), uploadDoctorPhoto.single("photo"), updateMyDoctorProfile);


router.get("/", getApprovedDoctors);
// Admin: fetch all doctors
router.get("/admin", protect, authorizeRoles("admin"), getAllDoctorsAdmin);
router.get("/:id", getDoctorById);
router.post("/", protect, authorizeRoles("doctor"), createDoctorProfile);
router.put("/:id/approve", protect, authorizeRoles("admin"), approveDoctor);
router.put("/:id/reject", protect, authorizeRoles("admin"), rejectDoctor);

export default router;

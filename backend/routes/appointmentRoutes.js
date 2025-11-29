import express from "express";
import {
  createAppointment,
  getMyAppointments,
  updateAppointmentStatus
} from "../controllers/appointmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", protect, createAppointment);
router.get("/me", protect, getMyAppointments);
router.patch("/:id/status", protect, updateAppointmentStatus);

export default router;

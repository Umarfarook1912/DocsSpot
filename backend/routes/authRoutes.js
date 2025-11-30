import express from "express";
import { login, register, getMe, updateMe, deleteMe } from "../controllers/authController.js";
import { uploadDoctorPhoto } from "../middleware/uploadDoctorPhoto.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// Always run upload middleware so req.body is populated for all roles
router.post("/register", uploadDoctorPhoto.single("photo"), register);

router.post("/login", login);

// Profile endpoints for logged-in user
router.get("/me", protect, getMe);
router.put("/me", protect, uploadDoctorPhoto.single("photo"), updateMe);
router.delete("/me", protect, deleteMe);

export default router;

import express from "express";
import { login, register } from "../controllers/authController.js";
import { uploadDoctorPhoto } from "../middleware/uploadDoctorPhoto.js";

const router = express.Router();


// Always run upload middleware so req.body is populated for all roles
router.post("/register", uploadDoctorPhoto.single("photo"), register);

router.post("/login", login);

export default router;

import express from "express";
import { login, register } from "../controllers/authController.js";
import { uploadDoctorPhoto } from "../middleware/uploadDoctorPhoto.js";

const router = express.Router();

// Use upload middleware only for doctor registration
router.post("/register", (req, res, next) => {
	if (req.body && req.body.role === "doctor") {
		uploadDoctorPhoto.single("photo")(req, res, next);
	} else {
		next();
	}
}, register);

router.post("/login", login);

export default router;

import express from "express";
import { getAllUsers, createUser, deleteUser, sendTestMail } from "../controllers/adminController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// All admin routes require admin role
router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.post("/users", protect, authorizeRoles("admin"), createUser);
router.delete("/users/:id", protect, authorizeRoles("admin"), deleteUser);
router.post("/mail-test", protect, authorizeRoles("admin"), sendTestMail);

export default router;

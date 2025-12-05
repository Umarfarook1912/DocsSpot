import { User } from "../models/User.js";
import { Doctor } from "../models/Doctor.js";
import { Appointment } from "../models/Appointment.js";
import { notifyAdminOnDoctorRegistration, verifyTransporter } from "../utils/mailer.js";

// GET /api/admin/users
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: e.message || "Server error" });
    }
};

// POST /api/admin/users
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role = "user", phone, designation, about } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "User exists" });

        const user = await User.create({ name, email, password, role, phone, designation, about });

        // If created as doctor, create a Doctor profile placeholder
        if (role === "doctor") {
            await Doctor.create({ user: user._id, specialization: "General", experience: 0, fee: 0 });
        }

        res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone } });
    } catch (e) {
        res.status(500).json({ message: e.message || "Server error" });
    }
};

// DELETE /api/admin/users/:id
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.role === "doctor") {
            const doctor = await Doctor.findOne({ user: user._id });
            if (doctor) {
                await Appointment.deleteMany({ doctor: doctor._id });
                await Doctor.deleteOne({ _id: doctor._id });
            }
            await Appointment.deleteMany({ patient: user._id });
        } else {
            // patient or admin: remove their appointments as patient
            await Appointment.deleteMany({ patient: user._id });
        }

        await User.deleteOne({ _id: user._id });
        res.json({ message: "User deleted" });
    } catch (e) {
        res.status(500).json({ message: e.message || "Server error" });
    }
};

// POST /api/admin/mail-test
export const sendTestMail = async (req, res) => {
    try {
        // try verifying transporter first
        try {
            await verifyTransporter();
        } catch (err) {
            // continue; verifyTransporter already logs
        }

        // send a test mail to ADMIN_EMAIL (mailer handles missing ADMIN_EMAIL)
        // we reuse notifyAdminOnDoctorRegistration signature by passing a fake doctor
        const fakeUser = { name: "Test Doctor", email: "test-doctor@example.com", phone: "N/A", designation: "MD" };
        const fakeProfile = { specialization: "General", experience: 1, fee: 0 };
        await notifyAdminOnDoctorRegistration(fakeUser, fakeProfile);
        res.json({ message: "Test mail attempted (check backend logs and ADMIN_EMAIL inbox)." });
    } catch (e) {
        res.status(500).json({ message: e.message || "Failed to send test mail" });
    }
};

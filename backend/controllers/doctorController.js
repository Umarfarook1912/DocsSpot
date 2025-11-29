import { Doctor } from "../models/Doctor.js";

export const createDoctorProfile = async (req, res) => {
  try {
    const existing = await Doctor.findOne({ user: req.user._id });
    if (existing) return res.status(400).json({ message: "Profile exists" });

    const doctor = await Doctor.create({ ...req.body, user: req.user._id });
    res.status(201).json(doctor);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getApprovedDoctors = async (_req, res) => {
  try {
    const doctors = await Doctor.find({ isApproved: true }).populate("user", "name email");
    res.json(doctors);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const approveDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    res.json(doctor);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

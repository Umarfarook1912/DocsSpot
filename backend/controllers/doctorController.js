// Get logged-in doctor's profile
export const getMyDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id }).populate("user", "name email phone designation about photo");
    if (!doctor) return res.status(404).json({ message: "Profile not found" });
    res.json(doctor);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Update logged-in doctor's profile
export const updateMyDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id }).populate("user");
    if (!doctor) return res.status(404).json({ message: "Profile not found" });
    // Update doctor fields
    if (req.body.specialization) doctor.specialization = req.body.specialization;
    if (req.body.experience) doctor.experience = req.body.experience;
    if (req.body.fee) doctor.fee = req.body.fee;
    await doctor.save();
    // Update user fields
    const user = doctor.user;
    if (req.body.name) user.name = req.body.name;
    if (req.body.phone) user.phone = req.body.phone;
    if (req.body.designation) user.designation = req.body.designation;
    if (req.body.about) user.about = req.body.about;
    if (req.file) user.photo = req.file.path;
    await user.save();
    res.json(await Doctor.findOne({ user: req.user._id }).populate("user", "name email phone designation about photo"));
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("user", "name email phone designation about photo");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
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
    const doctors = await Doctor.find({ isApproved: true }).populate("user", "name email phone designation about photo");
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

export const rejectDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { isApproved: false },
      { new: true }
    );
    res.json(doctor);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllDoctorsAdmin = async (_req, res) => {
  try {
    const doctors = await Doctor.find().populate("user", "name email phone designation about photo");
    res.json(doctors);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

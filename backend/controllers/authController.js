

import { User } from "../models/User.js";
import { Doctor } from "../models/Doctor.js";
import { Appointment } from "../models/Appointment.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role = "user", phone, designation, about, specialization, experience, fee } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User exists" });

    let userData = { name, email, password, role, phone };
    if (role === "doctor") {
      userData.designation = designation;
      userData.about = about;
      if (req.file) {
        userData.photo = req.file.path;
      }
    }

    const user = await User.create(userData);

    // If doctor, create Doctor profile as well
    if (role === "doctor") {
      // specialization, experience, fee are required for Doctor
      await Doctor.create({
        user: user._id,
        specialization: specialization || "General",
        experience: experience || 0,
        fee: fee || 0
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        ...(user.role === "doctor" && {
          designation: user.designation,
          about: user.about,
          photo: user.photo
        })
      }
    });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Get logged-in user's profile (includes doctor extra info when applicable)
export const getMe = async (req, res) => {
  try {
    const user = req.user;
    let payload = { user };
    if (user.role === "doctor") {
      const doctor = await Doctor.findOne({ user: user._id });
      payload.doctor = doctor;
    }
    res.json(payload);
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

// Update logged-in user's profile
export const updateMe = async (req, res) => {
  try {
    const user = req.user;
    const { name, phone, designation, about } = req.body;

    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (designation !== undefined) user.designation = designation;
    if (about !== undefined) user.about = about;
    if (req.file) user.photo = req.file.path;

    await user.save();

    // If doctor, update Doctor doc fields if provided
    if (user.role === "doctor") {
      const { specialization, experience, fee } = req.body;
      const doctor = await Doctor.findOne({ user: user._id });
      if (doctor) {
        if (specialization !== undefined) doctor.specialization = specialization;
        if (experience !== undefined) doctor.experience = experience;
        if (fee !== undefined) doctor.fee = fee;
        await doctor.save();
      }
    }

    res.json({ user });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

// Delete logged-in user's account and related data
export const deleteMe = async (req, res) => {
  try {
    const user = req.user;
    if (user.role === "doctor") {
      const doctor = await Doctor.findOne({ user: user._id });
      if (doctor) {
        await Appointment.deleteMany({ doctor: doctor._id });
        await Doctor.deleteOne({ _id: doctor._id });
      }
      // also remove appointments where patient is this user
      await Appointment.deleteMany({ patient: user._id });
    } else {
      // patient or admin: remove their appointments as patient
      await Appointment.deleteMany({ patient: user._id });
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "Account deleted" });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server error" });
  }
};

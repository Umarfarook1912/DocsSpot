import { Appointment } from "../models/Appointment.js";

export const createAppointment = async (req, res) => {
  const { doctorId, date, time } = req.body;
  try {
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      date,
      time
    });
    res.status(201).json(appointment);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const filter =
      req.user.role === "doctor"
        ? { doctor: req.user._id }
        : { patient: req.user._id };

    const appointments = await Appointment.find(filter)
      .populate("doctor")
      .populate("patient", "name email");

    res.json(appointments);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

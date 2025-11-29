
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    // Only doctor can update their own appointments
    if (String(appointment.doctor) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    appointment.status = status;
    await appointment.save();
    res.json(appointment);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
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
      .populate({
        path: "doctor",
        populate: { path: "user", select: "name email phone designation about photo" }
      })
      .populate("patient", "name email");

    res.json(appointments);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


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
    // appointment.doctor is a Doctor id; find the Doctor document to verify ownership
    const doctorDoc = await Doctor.findById(appointment.doctor);
    if (!doctorDoc) return res.status(404).json({ message: 'Doctor not found' });
    if (String(doctorDoc.user) !== String(req.user._id)) {
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
import { Doctor } from "../models/Doctor.js";

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
    let filter;
    if (req.user.role === "doctor") {
      // find the Doctor doc for this user
      const myDoctor = await Doctor.findOne({ user: req.user._id });
      if (!myDoctor) return res.status(404).json({ message: "Doctor profile not found" });
      filter = { doctor: myDoctor._id };
    } else {
      filter = { patient: req.user._id };
    }

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

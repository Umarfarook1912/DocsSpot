import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, default: 0 },
    fee: { type: Number, required: true },
    isApproved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);

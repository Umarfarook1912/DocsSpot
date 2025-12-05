import nodemailer from "nodemailer";
import { User } from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL; // email where admin notifications are sent

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.warn("SMTP not fully configured. Emails will fail until SMTP_* vars are set.");
}

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT ? Number(SMTP_PORT) : undefined,
    secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
});

async function sendMail({ to, subject, text, html }) {
    const from = SMTP_USER || `no-reply@${process.env.SMTP_HOST || "localhost"}`;
    const mailOptions = { from, to, subject, text, html };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}: ${info.messageId || JSON.stringify(info)}`);
        return info;
    } catch (err) {
        console.error("Failed to send email", err);
        throw err;
    }
}

// helper to verify transporter connection/config
export async function verifyTransporter() {
    try {
        if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
            console.warn('SMTP not fully configured; verifyTransporter will likely fail.');
        }
        const ok = await transporter.verify();
        console.log('SMTP transporter verification result:', ok);
        return ok;
    } catch (err) {
        console.error('SMTP transporter verification failed', err);
        throw err;
    }
}

export async function notifyAdminOnDoctorRegistration(doctorUser, doctorProfile) {
    // doctorUser: user doc, doctorProfile: doctor doc (may be null)
    let to = ADMIN_EMAIL;
    if (!to) {
        // try to find an admin user's email from DB as a fallback
        try {
            const adminUser = await User.findOne({ role: "admin" }).select("email name");
            if (adminUser && adminUser.email) {
                to = adminUser.email;
                console.warn(`ADMIN_EMAIL env not set; using admin user ${adminUser.email} from DB as fallback`);
            }
        } catch (err) {
            console.error('Failed to lookup admin user for fallback email', err);
        }
    }

    if (!to) {
        console.warn("ADMIN_EMAIL not set and no admin user found; skipping admin notification");
        return;
    }
    const subject = `New doctor registration: ${doctorUser.name}`;
    const text = `A new doctor registered on DocsSpot.\n\nName: ${doctorUser.name}\nEmail: ${doctorUser.email}\nPhone: ${doctorUser.phone || 'N/A'}\nDesignation: ${doctorUser.designation || 'N/A'}\nSpecialization: ${doctorProfile?.specialization || 'N/A'}\nExperience: ${doctorProfile?.experience || 'N/A'} years\nFee: ${doctorProfile?.fee || 'N/A'}\n\nPlease review and approve the doctor in the admin panel.`;
    await sendMail({ to, subject, text });
}

export async function notifyDoctorOnApproval(doctorUser) {
    const to = doctorUser.email;
    if (!to) {
        console.warn("Doctor email missing, skipping approval notification");
        return;
    }
    const subject = `Your DocsSpot account has been approved`;
    const text = `Hello ${doctorUser.name},\n\nYour doctor account on DocsSpot has been approved by the admin. You can now log in and receive appointments.\n\nLogin: ${process.env.FRONTEND_URL || 'http://localhost:5173'}/login\n\nRegards,\nDocsSpot Team`;
    await sendMail({ to, subject, text });
}

export async function notifyDoctorOnNewAppointment(doctorUser, appointment, patientUser) {
    const to = doctorUser.email;
    if (!to) return;
    const subject = `New appointment request from ${patientUser.name}`;
    const text = `Hello ${doctorUser.name},\n\nYou have a new appointment request.\n\nPatient: ${patientUser.name}\nEmail: ${patientUser.email}\nDate: ${appointment.date}\nTime: ${appointment.time}\n\nPlease login to your dashboard to confirm or reject the appointment.\n\nRegards, DocsSpot`;
    await sendMail({ to, subject, text });
}

export async function notifyUserOnAppointmentConfirmed(user, appointment, doctorUser) {
    const to = user.email;
    if (!to) return;
    const subject = `Your appointment with ${doctorUser.name} is confirmed`;
    const text = `Hello ${user.name},\n\nYour appointment has been confirmed by Dr. ${doctorUser.name}.\n\nDate: ${appointment.date}\nTime: ${appointment.time}\n\nPlease contact the clinic if you need to reschedule.\n\nRegards, DocsSpot`;
    await sendMail({ to, subject, text });
}

export default sendMail;

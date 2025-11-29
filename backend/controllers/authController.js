
import { User } from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role = "user", phone, designation, about } = req.body;
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
    res.status(500).json({ message: "Server error" });
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

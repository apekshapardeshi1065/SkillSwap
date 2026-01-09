import express from "express";
import { protect } from "../middleware/auth.js";
import User from "../models/User.js";
import multer from "multer";
import path from "path";

const router = express.Router();

/* ------------------ Multer Config for Avatar Upload ------------------ */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, req.user._id + ext); // filename = userId.ext
  },
});

const upload = multer({ storage });

/* ------------------ Get Current User Profile ------------------ */
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ------------------ Update Name & Email ------------------ */
router.put("/me", protect, async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ------------------ Add Skill ------------------ */
router.put("/skills", protect, async (req, res) => {
  const { skill } = req.body;
  if (!skill) return res.status(400).json({ message: "Skill is required" });

  try {
    const user = await User.findById(req.user._id);
    if (!user.skills.includes(skill)) {
      user.skills.push(skill);
      await user.save();
    }
    res.json({ message: "Skill added", skills: user.skills });
  } catch (err) {
    res.status(500).json({ message: "Error adding skill" });
  }
});

/* ------------------ Delete Skill ------------------ */
router.delete("/skills/:skill", protect, async (req, res) => {
  const skill = req.params.skill;
  try {
    const user = await User.findById(req.user._id);
    user.skills = user.skills.filter((s) => s !== skill);
    await user.save();
    res.json({ message: "Skill removed", skills: user.skills });
  } catch (err) {
    res.status(500).json({ message: "Error deleting skill" });
  }
});

/* ------------------ Get All Users (Optionally Filter by Skill) ------------------ */
router.get("/all", protect, async (req, res) => {
  const skillQuery = req.query.skill;
  try {
    let users;
    if (skillQuery) {
      users = await User.find({ skills: { $regex: skillQuery, $options: "i" } }).select(
        "name skills email avatar"
      );
    } else {
      users = await User.find().select("name skills email avatar");
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ------------------ Upload Profile Picture ------------------ */
router.put("/me/avatar", protect, upload.single("avatar"), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.avatar = req.file.filename; // store filename in DB
    await user.save();

    res.json({ message: "Profile picture updated", avatar: user.avatar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading avatar" });
  }
});

export default router;

import express from "express";
import { protect } from "../middleware/auth.js";
import Request from "../models/Request.js";
import User from "../models/User.js";

const router = express.Router();

// GET all requests for current user
router.get("/my", protect, async (req, res) => {
  try {
    // Find requests where current user is the recipient
    const requests = await Request.find({ to: req.user._id })
      .populate("from", "name email")
      .populate("to", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /request/:id to update status
router.put("/:id", protect, async (req, res) => {
  const { action } = req.body; // accepted / rejected
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = action;
    await request.save();
    res.json({ message: "Request updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

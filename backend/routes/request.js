// import express from "express";
// import { protect } from "../middleware/auth.js";
// import Request from "../models/Request.js";

// const router = express.Router();

// // Create a new request
// router.post("/", protect, async (req, res) => {
//   const { to, skill } = req.body;
//   try {
//     const request = new Request({
//       from: req.user.id,
//       to,
//       skill,
//     });
//     await request.save();
//     res.json({ message: "Request sent successfully", request });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Get all requests for logged-in user
// router.get("/", protect, async (req, res) => {
//   try {
//     const requests = await Request.find({ to: req.user.id })
//       .populate("from", "name email skills")
//       .sort({ createdAt: -1 });
//     res.json(requests);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Accept or reject a request
// router.put("/:id", protect, async (req, res) => {
//   const { status } = req.body; // accepted / rejected
//   try {
//     const request = await Request.findById(req.params.id);
//     if (!request) return res.status(404).json({ message: "Request not found" });
//     if (request.to.toString() !== req.user.id)
//       return res.status(403).json({ message: "Not authorized" });

//     request.status = status;
//     await request.save();
//     res.json({ message: `Request ${status}`, request });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;

// import express from "express";
// import { protect } from "../middleware/auth.js";
// import Request from "../models/Request.js";

// const router = express.Router();

// // Create a request → only logged-in users
// router.post("/", protect, async (req, res) => {
//   const { to, skill } = req.body;
//   try {
//     const request = new Request({
//       from: req.user._id, // req.user set by protect
//       to,
//       skill,
//     });
//     await request.save();
//     res.json({ message: "Request sent successfully", request });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Get all requests for logged-in user
// router.get("/", protect, async (req, res) => {
//   const requests = await Request.find({ to: req.user._id }).populate("from", "name skills");
//   res.json(requests);
// });

// export default router;


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

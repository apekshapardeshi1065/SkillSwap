import express from "express";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, (req, res) => {
  res.json({ message: "Protected route accessed", userId: req.user.id });
});

export default router;

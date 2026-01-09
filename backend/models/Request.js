import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  skill: { type: String, required: true },
  status: { type: String, default: "pending" }, // pending / accepted / rejected
}, { timestamps: true });

export default mongoose.model("Request", requestSchema);

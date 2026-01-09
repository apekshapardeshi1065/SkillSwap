import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: { type: [String], default: [] }, // Array of skills
   avatar: { type: String, default: "" },
});

export default mongoose.model("User", userSchema);



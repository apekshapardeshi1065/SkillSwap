// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },

//     skillsOffered: [{ type: String }],
//     skillsWanted: [{ type: String }],

//     rating: { type: Number, default: 0 },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   skills: [{ type: String }] // array of skills
// }, { timestamps: true });

// export default mongoose.model("User", userSchema);


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // skills: [{ type: String }], 
  skills: { type: [String], default: [] }, // Array of skills
   avatar: { type: String, default: "" }, // new field
});

export default mongoose.model("User", userSchema);



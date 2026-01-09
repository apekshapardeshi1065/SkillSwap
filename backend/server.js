// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");

// dotenv.config();
// const app = express();
// const auth = require("./routes/auth");



// app.use("/api/auth", authRoutes);



// // Middleware
// app.use(express.json());
// // app.use(cors());



// app.use(cors({
//   origin: "http://localhost:3000", // frontend port
//   credentials: true
// }));


import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import userRoutes from "./routes/user.js";
import requestRoutes from "./routes/request.js";

dotenv.config();

const app = express();

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => {
  console.error("MongoDB connection error:", err.message);
  process.exit(1);
});

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes); // add dashboard route
app.use("/api/user", userRoutes); // add this
app.use("/api/request", requestRoutes); // add this line
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


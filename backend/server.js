// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRoutes from "./routes/auth.js";
// import dashboardRoutes from "./routes/dashboard.js";
// import userRoutes from "./routes/user.js";
// import requestRoutes from "./routes/request.js";

// dotenv.config();

// const app = express();

// // Connect MongoDB
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("MongoDB connected"))
// .catch(err => {
//   console.error("MongoDB connection error:", err.message);
//   process.exit(1);
// });

// // Middleware
// app.use(express.json());
// app.use(cors({ origin: "http://localhost:3000" }));

// // Routes

// app.use("/api/auth", authRoutes);
// app.use("/api/dashboard", dashboardRoutes); // add dashboard route
// app.use("/api/user", userRoutes); // add this
// app.use("/api/request", requestRoutes); // add this line
// app.use("/uploads", express.static("uploads"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const path = require('path');

// // React frontend serve karne ke liye
// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection (assuming db.js has connection logic)
import "./config/db.js";

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import userRoutes from "./routes/user.js";
import requestRoutes from "./routes/request.js";

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/user", userRoutes);
app.use("/api/request", requestRoutes);
app.use("/uploads", express.static("uploads"));

// === React frontend serve ===
const frontendBuildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendBuildPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


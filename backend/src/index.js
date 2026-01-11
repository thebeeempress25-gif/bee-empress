
import express, { json } from "express";
import { env } from "./config/env.js";
import hashRoutes from "./routes/hash.routes.js";
import cors from "cors";

const app = express();
const PORT = env.port ||3000;

// Middleware to parse JSON
app.use(json());
app.use(cors());

// Single API
app.get("/api/helth", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello from Node server 🚀",
  });
});
// Routes
app.use("/api", hashRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

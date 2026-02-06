import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import drinksRoute from "./routes/drinks.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(express.json());

// API routes
app.use("/api/drinks", drinksRoute);

// Serve React build
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, "../dist")));

// SPA fallback
app.use((req, res) => {
  res.sendFile(join(__dirname, "../dist/index.html"));
});

app.listen(5000, () => {
  console.log("API running on http://localhost:5000");
});

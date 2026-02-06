import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import drinksRoute from "./routes/drinks.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(express.json());

// API
app.use("/api/drinks", drinksRoute);

// Serve React build
const __dirname = new URL('.', import.meta.url).pathname;
app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

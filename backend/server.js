import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import drinksRoute from "./routes/drinks.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use("/api/drinks", drinksRoute);

app.use(express.json());

// API routes


// Serve React build
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, "../dist")));

// SPA fallback
app.use((req, res) => {
  res.sendFile(join(__dirname, "../dist/index.html"));
});
app.post("/api/userDrinks", async (req, res) => {
  const { name, ingredients, createdBy } = req.body;
  if (!name || !ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: "Invalid drink data" });
  }

  await db.collection("userDrinks").insertOne({
    name,
    ingredients: ingredients.map(i => ({ name: i.name.toLowerCase(), amount: Number(i.amount) })),
    status: "pending",
    createdBy: createdBy || "anonymous",
    createdAt: new Date(),
  });

  res.json({ message: "Drink submitted" });
});






app.listen(5000, () => {
  console.log("API running on http://localhost:5000");
});

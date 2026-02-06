import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import drinksRoute from "./routes/drinks.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/drinks", drinksRoute);

app.listen(5000, () => {
  console.log("API running on http://localhost:5000");
});

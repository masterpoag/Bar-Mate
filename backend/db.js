// db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

mongoose.connect(uri);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("✅ Connected to MongoDB!");
});

export default db;


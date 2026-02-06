import express from "express";
import Drink from "../models/Drink.js"; // your MongoDB Mongoose model

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const drinks = await Drink.find(); // fetch all drinks
    res.json(drinks); // send JSON to frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

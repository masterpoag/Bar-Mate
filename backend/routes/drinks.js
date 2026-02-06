import express from "express";
import Drink from "../models/Drink.js";

const router = express.Router();

// get all drinks
router.get("/", async (req, res) => {
  const drinks = await Drink.find();
  res.json(drinks);
});

// search by name
router.get("/search/:name", async (req, res) => {
  const drinks = await Drink.find({
    name: { $regex: req.params.name, $options: "i" }
  });
  res.json(drinks);
});

export default router;

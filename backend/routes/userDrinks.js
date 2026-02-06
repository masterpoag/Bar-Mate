import express from "express";
import UserDrink from "../models/UserDrink.js";
import slugify from "slugify"; // optional for unique slugs

const router = express.Router();

// Submit a new user drink
router.post("/", async (req, res) => {
  try {
    const { name, ingredients, instructions, description, image, createdBy } = req.body;

    if (!name || !ingredients || ingredients.length === 0) {
      return res.status(400).json({ message: "Name and at least one ingredient are required." });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const newDrink = new UserDrink({
      name,
      slug,
      ingredients,
      instructions,
      description,
      image: image || "",
      glass: "",
      category: "",
      alcoholic: "",
      createdBy: createdBy || "anonymous",
    });

    await newDrink.save();

    res.status(201).json({ message: "Drink submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit drink." });
  }
});

// Get all user-submitted drinks (for admin review)
router.get("/", async (req, res) => {
  try {
    const drinks = await UserDrink.find().sort({ submittedAt: -1 });
    res.json(drinks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch drinks." });
  }
});

// Approve a drink
router.post("/:id/approve", async (req, res) => {
  try {
    const drink = await UserDrink.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
    res.json(drink);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to approve drink." });
  }
});

// Delete a drink
router.delete("/:id", async (req, res) => {
  try {
    await UserDrink.findByIdAndDelete(req.params.id);
    res.json({ message: "Drink deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete drink." });
  }
});

export default router;

import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: Number,
  unit: String,
  modifier: String,
});

const userDrinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // optional: auto-generate from name
  ingredients: [ingredientSchema],
  instructions: String,
  description: String,
  image: String,
  glass: { type: String, default: "" },       // blank by default
  category: { type: String, default: "" },    // blank by default
  alcoholic: { type: String, default: "" },   // blank by default
  createdBy: String,
  approved: { type: Boolean, default: false },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model("UserDrink", userDrinkSchema);

import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: Number,
  unit: String,
  modifier: String
});

const userDrinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  ingredients: [ingredientSchema],
  instructions: String,
  description: String,
  image: String,
  glass: String,
  category: String,
  alcoholic: String,
  status: { type: String, default: "pending" }, // pending, accepted, rejected
  createdBy: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.UserDrink || mongoose.model("UserDrink", userDrinkSchema);

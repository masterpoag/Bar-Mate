import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: Number,
  unit: String,
  modifier: String
});

const drinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  ingredients: [ingredientSchema],
  instructions: String,
  description: String,
  image: String,
  glass: String,
  category: String,
  alcoholic: String
});

export default mongoose.model("Drink", drinkSchema);


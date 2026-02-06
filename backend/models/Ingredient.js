import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  type: String
});

export default mongoose.model("Ingredient", ingredientSchema);


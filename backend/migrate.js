import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import Drink from "./models/Drink.js";
import { parseIngredientAmount } from "./parseAmount.js";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Proper path to your React JSON file
const dataPath = path.join(__dirname, "../src/data/cocktails.json");

// Better slug generator
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const raw = fs.readFileSync(dataPath, "utf-8");
    const data = JSON.parse(raw);

    for (const drink of data) {
      if (!drink.name) continue;

      const structuredIngredients = (drink.ingredients || []).map(ing => {
        const parsed = parseIngredientAmount(ing.amount || "");

        return {
          name: ing.name?.trim() || "Unknown",
          amount: parsed.amount,
          unit: parsed.unit,
          modifier: parsed.modifier,
        };
      });

      const slug = slugify(drink.name);

      await Drink.updateOne(
        { slug },               // if exists, update
        {
          $set: {
            name: drink.name,
            slug,
            ingredients: structuredIngredients,
            instructions: drink.instructions || "",
            description: drink.description || "",
            image: drink.image || "",
            glass: drink.glass || "",
            category: drink.category || "",
            alcoholic: drink.alcoholic || "",
          },
        },
        { upsert: true }        // create if doesn't exist
      );
      console.log(`✔ Migrated: ${drink.name}`);
    }

    console.log("🎉 Migration complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
}

function round2(value) {
  if (typeof value !== "number") return value;
  return Math.round(value * 100) / 100;
}

async function fixAmounts() {
  const drinks = await Drink.find({});
  let updatedDrinks = 0;
  let updatedIngredients = 0;

  for (const drink of drinks) {
    let changed = false;

    drink.ingredients = drink.ingredients.map(ing => {
      const rounded = round2(ing.amount);

      if (rounded !== ing.amount) {
        changed = true;
        updatedIngredients++;
        ing.amount = rounded;
      }

      return ing;
    });

    if (changed) {
      await drink.save();
      updatedDrinks++;
      console.log(`✔ Fixed: ${drink.name}`);
    }
  }

  console.log(`Ingredients rounded: ${updatedIngredients}`);
  console.log(`Drinks updated: ${updatedDrinks}`);
}

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // await migrate();      
    await fixAmounts();

    console.log("🎉 All done!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

main();

import fs from "fs";
import path from "path";
import db from "./db.js";
import { parseIngredientAmount } from "./parseAmount.js";
import Drink from "./models/Drink.js";

async function migrate() {
  try {
    const dataPath = path.join(process.cwd(), "../src/data/cocktails.json");
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    for (const drink of data) {
      const structuredIngredients = drink.ingredients.map(ing => {
        const parsed = parseIngredientAmount(ing.amount || "");
        return {
          name: ing.name,
          amount: parsed.amount,
          unit: parsed.unit,
          modifier: parsed.modifier
        };
      });

      await Drink.create({
        name: drink.name,
        slug: drink.name.toLowerCase().replace(/\s+/g, "-"),
        ingredients: structuredIngredients,
        instructions: drink.instructions,
        description: drink.description || "",
        image: drink.image || "",
        glass: drink.glass || "",
        category: drink.category || "",
        alcoholic: drink.alcoholic || ""
      });

      console.log(`✅ Imported: ${drink.name}`);
    }

    console.log("🎉 Migration complete!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

migrate();

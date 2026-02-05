import fs from "fs";
import path from "path";

// Paths
const cocktailsPath = path.resolve("./src/data/cocktails.json");
const tempDrinksPath = path.resolve("./tempUserDrinks.json");
const tempValidPath = path.resolve("./tempValidDrinks.json");

// Load data
const cocktails = JSON.parse(fs.readFileSync(cocktailsPath, "utf-8"));
const tempDrinks = JSON.parse(fs.readFileSync(tempDrinksPath, "utf-8"));

let validDrinks = [];
let skippedDrinks = [];

// Validation function
const isValidDrink = (drink) => {
  if (!drink.name || drink.name.length < 2) return false;
  if (!drink.ingredients || drink.ingredients.length === 0) return false;
  if (!drink.instructions || drink.instructions.length < 5) return false;
  // Optional: skip drinks that already exist
  const exists = cocktails.find(c => c.name.toLowerCase() === drink.name.toLowerCase());
  if (exists) return false;
  return true;
};

// Run through all temp drinks
tempDrinks.forEach((drink) => {
  if (isValidDrink(drink)) {
    validDrinks.push(drink);
  } else {
    skippedDrinks.push(drink);
  }
});

// Save valid drinks to a separate temp file for review/merge
fs.writeFileSync(tempValidPath, JSON.stringify(validDrinks, null, 2));
console.log(`✅ ${validDrinks.length} valid drinks saved to tempValidDrinks.json`);
console.log(`⚠️ ${skippedDrinks.length} drinks skipped (invalid or duplicates)`);

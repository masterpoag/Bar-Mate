import express from "express";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());

const tempPath = path.resolve("./tempUserDrinks.json");

// Ensure temp file exists
if (!fs.existsSync(tempPath)) fs.writeFileSync(tempPath, "[]", "utf-8");

// POST endpoint to save a drink
app.post("/api/user-drinks", (req, res) => {
  const newDrink = req.body;

  if (!newDrink.name || !newDrink.ingredients || newDrink.ingredients.length === 0) {
    return res.status(400).json({ message: "Invalid drink format" });
  }

  const tempDrinks = JSON.parse(fs.readFileSync(tempPath, "utf-8"));
  const exists = tempDrinks.find(
    (d) => d.name.toLowerCase() === newDrink.name.toLowerCase()
  );

  if (exists) return res.status(409).json({ message: "Drink already exists" });

  tempDrinks.push(newDrink);
  fs.writeFileSync(tempPath, JSON.stringify(tempDrinks, null, 2));

  res.json({ message: "Drink saved to tempUserDrinks.json" });
});

app.listen(3001, () => console.log("Temp drink server running on port 3001"));

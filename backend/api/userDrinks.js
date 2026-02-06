import dbConnect from "@/lib/mongoose"; // your MongoDB connection helper
import UserDrink from "@/models/UserDrink";
import slugify from "slugify";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, ingredients, instructions, description, image, glass, category, alcoholic, createdBy } = req.body;

    if (!name || !ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: "Name and at least one ingredient required" });
    }

    const slug = slugify(name, { lower: true, strict: true });

    try {
      const newDrink = await UserDrink.create({
        name,
        slug,
        ingredients: ingredients.map(i => ({
          name: i.name,
          amount: i.amount ? Number(i.amount) : undefined,
          unit: i.unit || undefined,
          modifier: i.modifier || undefined
        })),
        instructions,
        description,
        image,
        glass,
        category,
        alcoholic,
        createdBy: createdBy || "anonymous"
      });

      res.status(200).json({ message: "Drink submitted!", drink: newDrink });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to submit drink" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

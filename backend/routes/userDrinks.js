app.post("/api/userDrinks", async (req, res) => {
  const { name, ingredients, instructions, description, image, createdBy } = req.body;

  if (!name || !ingredients || !Array.isArray(ingredients) || ingredients.length === 0 || !createdBy || !image) {
    return res.status(400).json({ error: "Missing required fields: name, ingredients, photo link, or your name." });
  }

  try {
    const drink = new Drink({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      ingredients: ingredients.map(i => ({
        name: i.name.toLowerCase(),
        amount: i.amount ? Number(i.amount) : undefined,
        unit: i.unit || "",
        modifier: i.modifier || "",
      })),
      instructions: instructions || "",
      description: description || "",
      image,
      glass: "",
      category: "",
      alcoholic: "",
      createdBy,
    });

    await drink.save(); // <-- this actually inserts into MongoDB

    res.status(201).json({ message: "Drink submitted successfully", drink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit drink" });
  }
});

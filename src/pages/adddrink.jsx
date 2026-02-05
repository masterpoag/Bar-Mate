import React, { useState } from "react";

export default function UserDrinksPage({ darkMode }) {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [glass, setGlass] = useState("");
  const [category, setCategory] = useState("Cocktail");
  const [alcoholic, setAlcoholic] = useState("Alcoholic");
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
  const [submitted, setSubmitted] = useState(false);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  const updateIngredient = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDrink = {
      name: name.trim(),
      ingredients: ingredients
        .filter((i) => i.name.trim() !== "")
        .map((i) => ({ name: i.name.trim(), amount: i.amount.trim() })),
      instructions: instructions.trim(),
      image: image.trim(),
      description: description.trim(),
      glass: glass.trim(),
      category: category.trim() || "Cocktail",
      alcoholic: alcoholic.trim() || "Alcoholic",
    };

    try {
      const res = await fetch("http://localhost:3001/api/user-drinks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDrink),
      });

      if (res.ok) {
        setSubmitted(true);
        setName("");
        setInstructions("");
        setImage("");
        setDescription("");
        setGlass("");
        setIngredients([{ name: "", amount: "" }]);
      }
    } catch (err) {
      alert("Server not running.");
    }
  };

//   const pageStyle = {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: darkMode ? "#121212" : "#f5f5f5",
//   };

  const cardStyle = {
    width: "100%",
    maxWidth: "700px",
    padding: "2rem",
    borderRadius: "12px",
    background: darkMode ? "#1e1e1e" : "#ffffff",
    boxShadow: darkMode
      ? "0 4px 12px rgba(0,0,0,0.6)"
      : "0 4px 12px rgba(0,0,0,0.1)",
    color: darkMode ? "#f1f1f1" : "#111",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.6rem",
    marginBottom: "0.8rem",
    borderRadius: "8px",
    border: darkMode ? "1px solid #444" : "1px solid #ccc",
    background: darkMode ? "#2a2a2a" : "#fff",
    color: darkMode ? "#f1f1f1" : "#111",
  };

  const buttonStyle = {
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "0.5rem",
    background: darkMode ? "#ff6f61" : "#1976d2",
    color: "#fff",
  };

  return (
    <div>
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center" }}>Add a User Drink</h2>
        {submitted && (
          <p style={{ color: "limegreen", textAlign: "center" }}>
            Drink added to temp JSON!
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            placeholder="Drink Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            style={inputStyle}
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <textarea
            style={inputStyle}
            rows={3}
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />

          <input
            style={inputStyle}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            style={inputStyle}
            placeholder="Glass"
            value={glass}
            onChange={(e) => setGlass(e.target.value)}
          />

          <h4>Ingredients</h4>
          {ingredients.map((ing, idx) => (
            <div
              key={idx}
              style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}
            >
              <input
                style={{ ...inputStyle, flex: 2 }}
                placeholder="Ingredient"
                value={ing.name}
                onChange={(e) =>
                  updateIngredient(idx, "name", e.target.value)
                }
                required
              />
              <input
                style={{ ...inputStyle, flex: 1 }}
                placeholder="Amount"
                value={ing.amount}
                onChange={(e) =>
                  updateIngredient(idx, "amount", e.target.value)
                }
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  style={buttonStyle}
                  onClick={() => removeIngredient(idx)}
                >
                  ❌
                </button>
              )}
            </div>
          ))}

          <button type="button" style={buttonStyle} onClick={addIngredient}>
            ➕ Add Ingredient
          </button>

          <br />

          <button type="submit" style={buttonStyle}>
            Submit Drink
          </button>
        </form>
      </div>
    </div>
  );
}

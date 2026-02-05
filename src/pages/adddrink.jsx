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
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDrink = {
      name: name.trim(),
      ingredients: ingredients
        .filter((ing) => ing.name.trim() !== "")
        .map((ing) => ({ name: ing.name.trim(), amount: ing.amount.trim() })),
      instructions: instructions.trim(),
      image: image.trim(),
      description: description.trim(),
      glass: glass.trim(),
      category: category.trim(),
      alcoholic: alcoholic.trim(),
    };

    try {
      const res = await fetch("http://localhost:3001/api/user-drinks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDrink),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setName("");
        setInstructions("");
        setImage("");
        setDescription("");
        setGlass("");
        setCategory("Cocktail");
        setAlcoholic("Alcoholic");
        setIngredients([{ name: "", amount: "" }]);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save drink. Is the server running?");
    }
  };

  const formStyle = {
    maxWidth: "600px",
    margin: "1rem auto",
    padding: "1rem",
    background: darkMode ? "#1e1e1e" : "#fff",
    color: darkMode ? "#f5f5f5" : "#121212",
    borderRadius: "8px",
    boxShadow: darkMode
      ? "0 2px 6px rgba(0,0,0,0.7)"
      : "0 2px 6px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    background: darkMode ? "#ff6f61" : "#1976d2",
    color: "#fff",
    marginRight: "0.5rem",
    marginTop: "0.5rem",
  };

  return (
    <div style={formStyle}>
      <h2>Add a User Drink</h2>
      {submitted && <p style={{ color: "limegreen" }}>Drink added to temp JSON!</p>}
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
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={3}
          required
        />
        <input
          style={inputStyle}
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          style={inputStyle}
          placeholder="Glass (optional)"
          value={glass}
          onChange={(e) => setGlass(e.target.value)}
        />
        <input
          style={inputStyle}
          placeholder="Category (default: Cocktail)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          style={inputStyle}
          placeholder="Alcoholic (default: Alcoholic)"
          value={alcoholic}
          onChange={(e) => setAlcoholic(e.target.value)}
        />

        <h4>Ingredients</h4>
        {ingredients.map((ing, idx) => (
          <div
            key={idx}
            style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}
          >
            <input
              style={{ ...inputStyle, flex: 2 }}
              placeholder="Ingredient Name"
              value={ing.name}
              onChange={(e) => updateIngredient(idx, "name", e.target.value)}
              required
            />
            <input
              style={{ ...inputStyle, flex: 1 }}
              placeholder="Amount (e.g., 1 oz)"
              value={ing.amount}
              onChange={(e) => updateIngredient(idx, "amount", e.target.value)}
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
  );
}

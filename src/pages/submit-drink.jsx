import React, { useState } from "react";

export default function SubmitDrinkPage({ user, darkMode }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState({ name: "", amount: "", unit: "", modifier: "" });
  const [instructions, setInstructions] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const addIngredient = () => {
    if (!currentIngredient.name) return;
    setIngredients([...ingredients, { ...currentIngredient }]);
    setCurrentIngredient({ name: "", amount: "", unit: "", modifier: "" });
  };

  const removeIngredient = (idx) => {
    setIngredients(ingredients.filter((_, i) => i !== idx));
  };

  const submitDrink = async () => {
    if (!name || ingredients.length === 0) {
      setMessage("Please add a name and at least one ingredient.");
      return;
    }

    try {
      const res = await fetch("/api/userDrinks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          ingredients,
          instructions,
          description,
          createdBy: user?.username || "anonymous",
        }),
      });

      if (res.ok) {
        setMessage("Drink submitted! Awaiting approval.");
        setName(""); setIngredients([]); setInstructions(""); setDescription("");
      } else {
        setMessage("Failed to submit drink.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error submitting drink.");
    }
  };

  // --- Styles ---
  const containerStyle = {
    minHeight: "100vh",
    width: "100vw",
    padding: "2rem",
    boxSizing: "border-box",
    background: darkMode ? "#121212" : "#f5f5f5",
    color: darkMode ? "#f5f5f5" : "#121212",
    transition: "all 0.3s",
  };

  const sectionStyle = { marginBottom: "1.5rem" };
  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "0.5rem",
    borderRadius: "6px",
    border: darkMode ? "1px solid #555" : "1px solid #ccc",
    background: darkMode ? "#1e1e1e" : "#fff",
    color: darkMode ? "#f5f5f5" : "#121212",
  };
  const textareaStyle = { ...inputStyle, minHeight: "60px" };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    marginTop: "0.5rem",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#1976d2",
    color: "#fff",
    fontWeight: "bold",
    transition: "all 0.2s",
  };

  const ingredientContainer = { display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center", marginBottom: "0.5rem" };
  const ingredientInputStyle = { flex: "1 1 auto", padding: "0.4rem", borderRadius: "6px", border: darkMode ? "1px solid #555" : "1px solid #ccc", background: darkMode ? "#1e1e1e" : "#fff", color: darkMode ? "#f5f5f5" : "#121212" };

  const ingredientListStyle = { listStyle: "none", paddingLeft: 0 };

  const removeButtonStyle = {
    marginLeft: "0.5rem",
    background: "#f44336",
    color: "#fff",
    borderRadius: "4px",
    border: "none",
    padding: "0.2rem 0.4rem",
    cursor: "pointer",
    transition: "all 0.2s",
  };

  const addButtonStyle = { ...buttonStyle, background: "#4caf50" };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginTop: 0, marginBottom: "1rem" }}>🍹 Submit a New Drink</h1>
      {message && <p style={{ marginBottom: "1rem", fontWeight: "bold" }}>{message}</p>}

      {/* Drink Info */}
      <div style={sectionStyle}>
        <input style={inputStyle} placeholder="Drink Name" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea style={textareaStyle} placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        <textarea style={textareaStyle} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      {/* Ingredients */}
      <div style={sectionStyle}>
        <h3>Ingredients</h3>
        <div style={ingredientContainer}>
          <input style={ingredientInputStyle} placeholder="Name" value={currentIngredient.name} onChange={(e) => setCurrentIngredient({ ...currentIngredient, name: e.target.value })} />
          <input style={{ ...ingredientInputStyle, maxWidth: "70px" }} placeholder="Amount" value={currentIngredient.amount} onChange={(e) => setCurrentIngredient({ ...currentIngredient, amount: e.target.value })} />
          <input style={{ ...ingredientInputStyle, maxWidth: "70px" }} placeholder="Unit" value={currentIngredient.unit} onChange={(e) => setCurrentIngredient({ ...currentIngredient, unit: e.target.value })} />
          <input style={ingredientInputStyle} placeholder="Modifier" value={currentIngredient.modifier} onChange={(e) => setCurrentIngredient({ ...currentIngredient, modifier: e.target.value })} />
          <button style={addButtonStyle} onClick={addIngredient}>Add</button>
        </div>

        <ul style={ingredientListStyle}>
          {ingredients.map((i, idx) => (
            <li key={idx} style={{ marginBottom: "0.3rem" }}>
              {i.name} {i.amount} {i.unit} {i.modifier}
              <button style={removeButtonStyle} onClick={() => removeIngredient(idx)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <button style={buttonStyle} onClick={submitDrink}>Submit Drink</button>
    </div>
  );
}


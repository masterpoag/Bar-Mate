import React, { useState } from "react";

export default function SubmitDrinkPage({ user, darkMode }) {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState(user?.username || "");
  const [photo, setPhoto] = useState(""); // Photo link
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
    if (!name || !userName || !photo || ingredients.length === 0) {
      setMessage("Please provide your name, drink name, photo link, and at least one ingredient.");
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
          image: photo,
          createdBy: userName
        })
      });

      if (res.ok) {
        setMessage("Drink submitted! Awaiting approval.");
        setName(""); setUserName(user?.username || ""); setPhoto("");
        setIngredients([]); setInstructions(""); setDescription("");
      } else {
        const data = await res.json();
        setMessage(data.message || "Failed to submit drink.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error submitting drink.");
    }
  };

  // Styles
  const containerStyle = {
    minHeight: "100vh",
    padding: "2rem",
    background: darkMode ? "#121212" : "#f5f5f5",
    color: darkMode ? "#f5f5f5" : "#121212",
    transition: "all 0.3s",
    boxSizing: "border-box",
  };

  const inputStyle = {
    display: "block",
    marginBottom: "0.5rem",
    padding: "0.5rem",
    width: "100%",
    borderRadius: "4px",
    border: darkMode ? "1px solid #555" : "1px solid #ccc",
    background: darkMode ? "#1e1e1e" : "#fff",
    color: darkMode ? "#f5f5f5" : "#121212",
  };

  const ingredientContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.3rem",
    alignItems: "center",
    marginBottom: "1rem",
  };

  const ingredientInputStyle = {
    padding: "0.3rem",
    borderRadius: "4px",
    border: darkMode ? "1px solid #555" : "1px solid #ccc",
    background: darkMode ? "#1e1e1e" : "#fff",
    color: darkMode ? "#f5f5f5" : "#121212",
  };

  const addButtonStyle = {
    padding: "0.3rem 0.6rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    background: darkMode ? "#ff6f61" : "#1976d2",
    color: "#fff",
    fontWeight: "bold",
  };

  const removeButtonStyle = {
    marginLeft: "0.5rem",
    padding: "0.2rem 0.4rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    background: "#e53935",
    color: "#fff",
  };

  return (
    <div style={containerStyle}>
      <h1>Submit a New Drink</h1>
      {message && <p style={{ fontWeight: "bold" }}>{message}</p>}

      {/* User Name and Drink Info */}
      <input
        placeholder="Your Name"
        value={userName}
        onChange={e => setUserName(e.target.value)}
        style={inputStyle}
      />
      <input
        placeholder="Drink Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={inputStyle}
      />
      <input
        placeholder="Photo Link (required)"
        value={photo}
        onChange={e => setPhoto(e.target.value)}
        style={inputStyle}
      />
      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={e => setInstructions(e.target.value)}
        style={inputStyle}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={inputStyle}
      />

      {/* Ingredients */}
      <div>
        <h3>Ingredients</h3>
        <div style={ingredientContainerStyle}>
          <input
            placeholder="Name"
            value={currentIngredient.name}
            onChange={e => setCurrentIngredient({ ...currentIngredient, name: e.target.value })}
            style={{ ...ingredientInputStyle, flex: "2" }}
          />
          <input
            placeholder="Amount"
            value={currentIngredient.amount}
            onChange={e => setCurrentIngredient({ ...currentIngredient, amount: e.target.value })}
            style={{ ...ingredientInputStyle, flex: "1", maxWidth: "70px" }}
          />
          <input
            placeholder="Unit"
            value={currentIngredient.unit}
            onChange={e => setCurrentIngredient({ ...currentIngredient, unit: e.target.value })}
            style={{ ...ingredientInputStyle, flex: "1", maxWidth: "70px" }}
          />
          <input
            placeholder="Modifier"
            value={currentIngredient.modifier}
            onChange={e => setCurrentIngredient({ ...currentIngredient, modifier: e.target.value })}
            style={{ ...ingredientInputStyle, flex: "1" }}
          />
          <button style={addButtonStyle} onClick={addIngredient}>Add</button>
        </div>

        <ul>
          {ingredients.map((i, idx) => (
            <li key={idx} style={{ marginBottom: "0.3rem" }}>
              {i.name} {i.amount} {i.unit} {i.modifier}
              <button style={removeButtonStyle} onClick={() => removeIngredient(idx)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={submitDrink} style={{ marginTop: "1rem", padding: "0.5rem 1rem", borderRadius: "4px", border: "none", background: darkMode ? "#ff6f61" : "#1976d2", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>
        Submit Drink
      </button>
    </div>
  );
}

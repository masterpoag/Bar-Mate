import React, { useState } from "react";
export default function BarStockPage({ barStock, setBarStock, darkMode }) {
  const [input, setInput] = useState("");

  const addIngredient = () => {
    const ing = input.trim().toLowerCase();
    if (ing && !barStock.includes(ing)) {
      setBarStock([...barStock, ing]);
      setInput("");
    }
  };

  const removeIngredient = ing => setBarStock(barStock.filter(i => i !== ing));

  const inputStyle = {
    padding: "0.5rem",
    width: "200px",
    borderRadius: "5px",
    border: `1px solid ${darkMode ? "#333" : "#ccc"}`,
    background: darkMode ? "#1e1e1e" : "#fff",
    color: darkMode ? "#f5f5f5" : "#121212",
    marginRight: "0.5rem"
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    background: "#ff6f61",
    color: "#fff"
  };

  const tagStyle = ing => ({
    padding: "0.4rem 0.8rem",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: darkMode ? "#333" : "#e0e0e0",
    color: darkMode ? "#f5f5f5" : "#121212",
    cursor: "pointer"
  });

  return (
    <div>
      <h1>🍾 Your Bar Stock</h1>

      <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <input
          type="text"
          value={input}
          placeholder="Add ingredient..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addIngredient()}
          style={inputStyle}
        />
        <button onClick={addIngredient} style={buttonStyle}>Add</button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {barStock.map(ing => (
          <div key={ing} style={tagStyle(ing)}>
            <span style={{ textTransform: "capitalize" }}>{ing}</span>
            <span onClick={() => removeIngredient(ing)} style={{ fontWeight: "bold", cursor: "pointer" }}>×</span>
          </div>
        ))}
      </div>
    </div>
  );
}

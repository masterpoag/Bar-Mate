import { useState } from "react";

export default function BarStockPage({ barStock, setBarStock }) {
  const [input, setInput] = useState("");

  function addIngredient() {
    const ing = input.trim().toLowerCase();
    if (ing && !barStock.includes(ing)) {
      setBarStock([...barStock, ing]);
      setInput("");
    }
  }

  function removeIngredient(ing) {
    setBarStock(barStock.filter(i => i !== ing));
  }

  return (
    <div>
      <h1>🍾 Your Bar Stock</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={input}
          placeholder="Add ingredient..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addIngredient()}
          style={{ padding: "0.5rem", width: "200px", marginRight: "0.5rem" }}
        />
        <button onClick={addIngredient} style={{ padding: "0.5rem" }}>Add</button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {barStock.map(ing => (
          <div key={ing} style={{ padding: "0.25rem 0.5rem", border: "1px solid #ccc", borderRadius: "5px", background: "#f0f0f0", display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <span style={{ textTransform: "capitalize" }}>{ing}</span>
            <button onClick={() => removeIngredient(ing)} style={{ background: "red", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer" }}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
}

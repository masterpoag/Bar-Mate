import React, { useState } from "react";
import { convertAmount } from "../util/unitConverter";

export default function CocktailCard({ cocktail, darkMode }) {
  const [unit, setUnit] = useState("oz");
  const cardStyle = {
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: darkMode
      ? "0 4px 12px rgba(0,0,0,0.7)"
      : "0 4px 12px rgba(0,0,0,0.1)",
    background: darkMode ? "#1e1e1e" : "#fff",
    color: darkMode ? "#f5f5f5" : "#121212",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s",
  };

  const imgStyle = {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  };

  const contentStyle = {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const missingStyle = {
    color: "#ff6f61",
    fontWeight: "bold",
  };

  const missing = cocktail.missingIngredients || [];

  return (
    <div style={cardStyle}>
      {cocktail.image && <img src={cocktail.image} alt={cocktail.name} style={imgStyle} />}
      <div style={contentStyle}>
        <h3>{cocktail.name}</h3>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Unit:{" "}
            <select value={unit} onChange={e => setUnit(e.target.value)}>
              <option value="oz">oz</option>
              <option value="ml">ml</option>
              <option value="cl">cl</option>
              <option value="tbsp">tbsp</option>
              <option value="tsp">tsp</option>
            </select>
          </label>
        </div>

        {cocktail.instructions && (
          <p>
            <strong>Instructions:</strong> {cocktail.instructions}
          </p>
        )}

        {cocktail.ingredients && (
          <div>
            <strong>Ingredients:</strong>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              {cocktail.ingredients.map((ing, idx) => {
                const displayAmount = ing.amount
                  ? convertAmount(ing.amount, unit)
                  : "";
                return (
                  <li key={idx}>
                    {ing.name} {displayAmount ? `- ${displayAmount}` : ""}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {missing.length > 0 && (
          <p style={missingStyle}>
            <strong>Missing:</strong> {missing.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
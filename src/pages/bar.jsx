import React, { useState, useMemo } from "react";

export default function BarStockPage({ barStock, setBarStock, darkMode, cocktailsData }) {
  const [search, setSearch] = useState("");

// Count how many times each ingredient appears
const ingredientCounts = useMemo(() => {
  const counts = {};
  cocktailsData.forEach(cocktail => {
    cocktail.ingredients.forEach(i => {
      if (i?.name) {
        const name = i.name.toLowerCase();
        counts[name] = (counts[name] || 0) + 1;
      }
    });
  });
  return counts;
}, [cocktailsData]);

// Collect all unique ingredient names
const allIngredients = useMemo(() => {
  return Object.keys(ingredientCounts);
}, [ingredientCounts]);

// Filter ingredients based on search input and sort
const filteredIngredients = useMemo(() => {
  return allIngredients
    .filter(i => i.includes(search.toLowerCase()))
    .sort((a, b) => {
      // Selected ingredients come first
      const aSelected = barStock.includes(a) ? 0 : 1;
      const bSelected = barStock.includes(b) ? 0 : 1;
      if (aSelected !== bSelected) return aSelected - bSelected;

      // Then sort by frequency descending
      const countDiff = (ingredientCounts[b] || 0) - (ingredientCounts[a] || 0);
      if (countDiff !== 0) return countDiff;

      // Finally alphabetically
      return a.localeCompare(b);
    });
}, [allIngredients, search, barStock, ingredientCounts]);

// Toggle ingredient in bar stock
const toggleIngredient = (ing) => {
  if (barStock.includes(ing)) {
    setBarStock(barStock.filter(i => i !== ing));
  } else {
    setBarStock([...barStock, ing]);
  }
};


  // Badge styling
  const badgeStyle = (ing) => ({
    padding: "0.4rem 0.8rem",
    borderRadius: "20px",
    cursor: "pointer",
    background: barStock.includes(ing) ? "#ff6f61" : darkMode ? "#333" : "#e0e0e0",
    color: barStock.includes(ing) ? "#fff" : darkMode ? "#f5f5f5" : "#121212",
    textTransform: "capitalize",
    transition: "0.2s",
  });

  const searchStyle = {
    padding: "0.5rem",
    borderRadius: "5px",
    width: "100%",
    maxWidth: "300px",
    marginBottom: "1rem",
    border: darkMode ? "1px solid #555" : "1px solid #ccc",
    background: darkMode ? "#1e1e1e" : "#fff",
    color: darkMode ? "#f5f5f5" : "#121212",
  };

  return (
    <div style={{ marginTop: 0, marginBottom: "1rem" }}>
      <h1 style={{ marginTop: 0, marginBottom: "1rem" }}>🍾 Your Bar Stock</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search ingredients..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={searchStyle}
      />

      {/* Ingredients badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {filteredIngredients.map(ing => (
          <div
            key={ing}
            style={badgeStyle(ing)}
            onClick={() => toggleIngredient(ing)}
          >
            {ing}
          </div>
        ))}
      </div>
    </div>
  );
}

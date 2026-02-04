import React, { useState, useMemo } from "react";

export default function BarStockPage({ barStock, setBarStock, darkMode, cocktailsData }) {
  const [search, setSearch] = useState("");

  // 1️⃣ Auto-pull all unique ingredients from cocktails
  const allIngredients = useMemo(() => {
    const ingredientsSet = new Set();
    cocktailsData.forEach(cocktail => {
      cocktail.ingredients.forEach(i => {
        if (i) ingredientsSet.add(i.toLowerCase());
      });
    });
    return Array.from(ingredientsSet);
  }, [cocktailsData]);

  // 2️⃣ Filtered and sorted ingredients
  const filteredIngredients = useMemo(() => {
    return allIngredients
      .filter(i => i.includes(search.toLowerCase()))
      .sort((a, b) => {
        // Selected ingredients go first
        const aSelected = barStock.includes(a) ? 0 : 1;
        const bSelected = barStock.includes(b) ? 0 : 1;
        if (aSelected !== bSelected) return aSelected - bSelected;
        return a.localeCompare(b);
      });
  }, [allIngredients, search, barStock]);

  // 3️⃣ Toggle ingredient selection
  const toggleIngredient = (ing) => {
    if (barStock.includes(ing)) {
      setBarStock(barStock.filter(i => i !== ing));
    } else {
      setBarStock([...barStock, ing]);
    }
  };

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
    color: darkMode ? "#f5f5f5" : "#121212"
  };

  return (
    <div>
      <h1>🍾 Your Bar Stock</h1>

      {/* Fuzzy search input */}
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

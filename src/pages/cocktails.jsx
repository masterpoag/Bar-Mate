import React, { useState, useMemo } from "react";
import CocktailCard from "../components/CocktailCard";
import Fuse from "fuse.js";

export default function CocktailsPage({ barStock, cocktailsData, darkMode, unit }) {
  const [search, setSearch] = useState("");

  if (!cocktailsData) return <p>Loading cocktails...</p>;

  // 🔥 DO NOT CLONE — mutate originals
  const possibleCocktails = useMemo(() => {
    cocktailsData.forEach(cocktail => {
      const missingIngredients = cocktail.ingredients
        .filter(i => !barStock.includes(i.name.toLowerCase()))
        .map(i => i.name);

      cocktail.missingIngredients = missingIngredients;
    });

    return cocktailsData
      .filter(c => c.missingIngredients.length <= 1)
      .sort((a, b) => a.missingIngredients.length - b.missingIngredients.length);
  }, [cocktailsData, barStock]);

  // 🔥 Fuse built on SAME references
  const fuse = useMemo(() => {
    return new Fuse(possibleCocktails, {
      threshold: 0.3,
      ignoreLocation: true,
      minMatchCharLength: 2,
      keys: [
        { name: "name", weight: 0.7 },
        { name: "ingredients.name", weight: 0.3 },
      ],
    });
  }, [possibleCocktails]);

  const filteredCocktails = useMemo(() => {
    if (!search) return possibleCocktails;
    return fuse.search(search).map(r => r.item);
  }, [search, fuse, possibleCocktails]);

  const containerStyle = {
    minHeight: "100vh",
    width: "100vw",
    padding: "2rem",
    boxSizing: "border-box",
    background: darkMode ? "#121212" : "#f5f5f5",
    color: darkMode ? "#f5f5f5" : "#121212",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1rem",
  };

  const searchStyle = {
    padding: "0.5rem",
    borderRadius: "5px",
    width: "100%",
    maxWidth: "300px",
    marginBottom: "1rem",
  };

  return (
    <div style={containerStyle}>
      <h1>🍹 Cocktails You Can Make</h1>

      <input
        type="text"
        placeholder="Search cocktails..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={searchStyle}
      />

      {filteredCocktails.length === 0 && (
        <p style={{ fontStyle: "italic" }}>
          No cocktails match your search and bar stock.
        </p>
      )}

      <div style={gridStyle}>
        {filteredCocktails.map(c => (
          <CocktailCard key={c.slug} cocktail={c} darkMode={darkMode} unit={unit} />
        ))}
      </div>
    </div>
  );
}

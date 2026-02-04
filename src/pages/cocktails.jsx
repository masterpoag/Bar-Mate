import React, { useState, useMemo } from "react";
import CocktailCard from "../components/CocktailCard";
import Fuse from "fuse.js";

export default function CocktailsPage({ barStock, cocktailsData, darkMode }) {
  const [search, setSearch] = useState("");

  if (!cocktailsData) return <p>Loading cocktails...</p>;

  const possibleCocktails = useMemo(() => {
  return cocktailsData
    .map(cocktail => {
      const missingIngredients = cocktail.ingredients
        .filter(i => !barStock.includes(i.name.toLowerCase()))
        .map(i => i.name);
      return { ...cocktail, missingIngredients };
    })
    .filter(c => c.missingIngredients.length <= 1)
    .sort((a, b) => a.missingIngredients.length - b.missingIngredients.length);
}, [cocktailsData, barStock]);


  // Set up Fuse.js for fuzzy searching by cocktail name or ingredient names
  const fuse = useMemo(() => {
    return new Fuse(possibleCocktails, {
      keys: [
        "name",
        "ingredients.name",
      ],
      threshold: 0.4,
    });
  }, [possibleCocktails]);

  // Filter cocktails based on search input and prioritize ones you can make
const filteredCocktails = useMemo(() => {
  // Start with possibleCocktails (already has missingIngredients)
  let results = possibleCocktails;

  // Apply search if there is one
  if (search) {
    const fuseResults = fuse.search(search);
    results = fuseResults.map(r => r.item);
  }

  // Sort so cocktails with fewer missing ingredients come first
  return results.sort((a, b) => a.missingIngredients.length - b.missingIngredients.length);
}, [search, fuse, possibleCocktails]);



  const containerStyle = {
    minHeight: "100vh",
    width: "100vw",
    padding: "2rem",
    boxSizing: "border-box",
    background: darkMode ? "#121212" : "#f5f5f5",
    color: darkMode ? "#f5f5f5" : "#121212",
    transition: "all 0.3s",
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
    border: darkMode ? "1px solid #555" : "1px solid #ccc",
    background: darkMode ? "#1e1e1e" : "#fff",
    color: darkMode ? "#f5f5f5" : "#121212",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginTop: 0, marginBottom: "1rem" }}>🍹 Cocktails You Can Make</h1>

      {/* Fuzzy search input */}
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
          <CocktailCard key={c.name} cocktail={c} darkMode={darkMode} />
        ))}
      </div>
    </div>
  );
}

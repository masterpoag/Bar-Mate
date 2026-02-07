import React, { useState, useMemo } from "react";
import CocktailCard from "../components/CocktailCard";
import Fuse from "fuse.js";

export default function SearchCocktailsPage({ cocktailsData, barStock, darkMode, unit }) {
  const [search, setSearch] = useState("");

  if (!cocktailsData) return <p>Loading cocktails...</p>;

  const cocktailsWithMissing = useMemo(() => {
    return cocktailsData.map(cocktail => {
      const missingIngredients = cocktail.ingredients
        .filter(i => !barStock.includes(i.name.toLowerCase()))
        .map(i => i.name);

      return {
        ...cocktail,
        missingIngredients,
      };
    });
  }, [cocktailsData, barStock]);

  const fuse = useMemo(() => {
    return new Fuse(cocktailsWithMissing, {
      threshold: 0.3,
      ignoreLocation: true,
      minMatchCharLength: 2,
      keys: [
        { name: "name", weight: 0.7 },
        { name: "ingredients.name", weight: 0.3 },
      ],
    });
  }, [cocktailsWithMissing]);

  const filteredCocktails = useMemo(() => {
    if (!search.trim()) return cocktailsWithMissing;
    return fuse.search(search).map(r => r.item);
  }, [search, fuse, cocktailsWithMissing]);

  // Styles
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
    maxWidth: "400px",
    marginBottom: "1rem",
    border: darkMode ? "1px solid #555" : "1px solid #ccc",
    background: darkMode ? "#1e1e1e" : "#fff",
    color: darkMode ? "#f5f5f5" : "#121212",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginTop: 0, marginBottom: "1rem" }}>🔍 Search Cocktails</h1>

      <input
        type="text"
        placeholder="Search by name or ingredient..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={searchStyle}
      />

      {filteredCocktails.length === 0 && (
        <p style={{ fontStyle: "italic" }}>
          No cocktails match your search.
        </p>
      )}

      <div style={gridStyle}>
        {filteredCocktails.map(c => (
          <CocktailCard
            key={c.slug}  
            cocktail={c}
            darkMode={darkMode}
            unit={unit}
          />
        ))}
      </div>
    </div>
  );
}

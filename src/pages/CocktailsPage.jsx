import React from "react";
import CocktailCard from "../components/CocktailCard";

export default function CocktailsPage({ barStock, cocktailsData, darkMode }) {
  if (!cocktailsData) return <p>Loading cocktails...</p>;

  // Determine cocktails you can make or almost make
  const possibleCocktails = cocktailsData
    .map(cocktail => {
      const missingIngredients = cocktail.ingredients.filter(i => !barStock.includes(i));
      return { ...cocktail, missingIngredients };
    })
    .filter(c => c.missingIngredients.length <= 1);

  // Full-screen container styles
  const containerStyle = {
    minHeight: "100vh", // take full viewport height
    width: "100vw",     // full width
    padding: "2rem",    // inner spacing
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

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "1rem" }}>🍹 Cocktails You Can Make</h1>

      {possibleCocktails.length === 0 && (
        <p style={{ fontStyle: "italic" }}>No cocktails can be made with your current bar stock.</p>
      )}

      <div style={gridStyle}>
        {possibleCocktails.map(c => (
          <CocktailCard key={c.name} cocktail={c} darkMode={darkMode} />
        ))}
      </div>
    </div>
  );
}

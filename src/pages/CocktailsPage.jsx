import React from "react";
import CocktailCard from "../components/CocktailCard";

export default function CocktailsPage({ barStock, cocktailsData, darkMode }) {
  if (!cocktailsData) return <p>Loading cocktails...</p>;

  // 1️⃣ Compute which cocktails are possible or almost possible
  const possibleCocktails = cocktailsData
    .map(cocktail => {
      const missingIngredients = cocktail.ingredients.filter(i => !barStock.includes(i));
      return { ...cocktail, missingIngredients };
    })
    // Show cocktails that are fully possible or missing only 1 ingredient
    .filter(c => c.missingIngredients.length <= 1);

  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>🍹 Cocktails You Can Make</h1>

      {possibleCocktails.length === 0 && (
        <p style={{ fontStyle: "italic" }}>No cocktails can be made with your current bar stock.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {possibleCocktails.map(c => (
          <CocktailCard key={c.name} cocktail={c} darkMode={darkMode} />
        ))}
      </div>
    </div>
  );
}

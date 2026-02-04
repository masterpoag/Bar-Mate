import React, { useState } from "react";
import CocktailCard from "../components/CocktailCard";

export default function CocktailsPage({ barStock, cocktailsData, darkMode }) {
  const possibleCocktails = cocktailsData
    .map(cocktail => {
      const missingIngredients = cocktail.ingredients.filter(i => !barStock.includes(i));
      return { ...cocktail, missingIngredients };
    })
    .filter(c => c.missingIngredients.length <= 1);

  return (
    <div>
      <h1>🍹 Cocktails You Can Make</h1>

      {possibleCocktails.length === 0 && <p>No cocktails can be made with your current bar stock.</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
        {possibleCocktails.map(c => (
          <CocktailCard key={c.name} cocktail={c} darkMode={darkMode} />
        ))}
      </div>
    </div>
  );
}

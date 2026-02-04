import { useState } from 'react'
import './App.css'
import cocktailsData from "./data/cocktails.json";
import CocktailCard from "./components/CocktailCard";

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const allIngredients = [
    "tequila",
    "vodka",
    "gin",
    "rum",
    "triple sec",
    "lime juice",
    "tonic water"
  ];

  const possibleCocktails = cocktailsData.map(cocktail => {
    const missingIngredients = cocktail.ingredients.filter(
      i => !selectedIngredients.includes(i)
    );
    return {
      ...cocktail,
      missingIngredients
    };
  }).filter(cocktail => cocktail.missingIngredients.length <= 1); // allow 0 or 1 missing

  function toggleIngredient(ingredient) {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", background: "#f5f5f5" }}>
      <h1>🍸 Bar Mate</h1>

      <h2>Ingredients</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        {allIngredients.map(ingredient => (
          <label key={ingredient} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              checked={selectedIngredients.includes(ingredient)}
              onChange={() => toggleIngredient(ingredient)}
            />
            {ingredient}
          </label>
        ))}
      </div>

      <h2>Possible Cocktails</h2>
      {possibleCocktails.length === 0 && <p>No matches yet</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
        {possibleCocktails.map(cocktail => (
          <CocktailCard key={cocktail.name} cocktail={cocktail} />
        ))}
      </div>
    </div>
  );
}

export default App;
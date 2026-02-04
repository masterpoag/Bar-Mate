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

  const possibleCocktails = cocktailsData.filter(cocktail =>
    cocktail.ingredients.every(ingredient =>
      selectedIngredients.includes(ingredient)
    )
  );

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
      {allIngredients.map(ingredient => (
        <label key={ingredient} style={{ display: "block", marginBottom: "0.25rem" }}>
          <input
            type="checkbox"
            checked={selectedIngredients.includes(ingredient)}
            onChange={() => toggleIngredient(ingredient)}
          />
          {ingredient}
        </label>
      ))}

      <h2>Possible Cocktails</h2>
      {possibleCocktails.length === 0 && <p>No matches yet</p>}
      {possibleCocktails.map(cocktail => (
        <CocktailCard key={cocktail.name} cocktail={cocktail} />
      ))}
    </div>
  );
}

export default App;
import { useState } from 'react'
import './App.css'
import cocktailsData from "./data/cocktails.json";

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
    <div>
      <h1>🍸 Bar Mate</h1>

      <h2>Ingredients</h2>
      {allIngredients.map(ingredient => (
        <label key={ingredient} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={selectedIngredients.includes(ingredient)}
            onChange={() => toggleIngredient(ingredient)}
          />
          {ingredient}
        </label>
      ))}

      <h2>Possible Cocktails</h2>
      <ul>
        {possibleCocktails.length === 0 && <li>No matches yet</li>}
        {possibleCocktails.map(cocktail => (
          <li key={cocktail.name}>{cocktail.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

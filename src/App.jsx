import { useState } from 'react'
import './App.css'
import cocktailsData from "./data/cocktails.json";
import CocktailCard from "./components/CocktailCard";

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const allIngredients = Array.from(
  new Set(cocktailsData.flatMap(c => c.ingredients))
).sort();
  const [cocktailSearch, setCocktailSearch] = useState("");
  const [ingredientSearch, setIngredientSearch] = useState("");
  const filteredIngredients = allIngredients.filter(i =>
  i.toLowerCase().includes(ingredientSearch.toLowerCase())
);

  

  const possibleCocktails = cocktailsData
  .map(cocktail => {
    const missingIngredients = cocktail.ingredients.filter(
      i => !selectedIngredients.includes(i)
    );
    return {
      ...cocktail,
      missingIngredients
    };
  })
  .filter(cocktail => 
    cocktail.missingIngredients.length <= 1 &&
    cocktail.name.toLowerCase().includes(cocktailSearch.toLowerCase())
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
      <div style={{ marginBottom: "1rem" }}></div>
  <input
    type="text"
    placeholder="Search ingredients..."
    value={ingredientSearch}
    onChange={e => setIngredientSearch(e.target.value)}
    style={{ padding: "0.5rem", width: "100%" }}
  />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
  {filteredIngredients.map(ingredient => (
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
      <div style={{ marginBottom: "1rem" }}>
  <input
    type="text"
    placeholder="Search cocktails..."
    value={cocktailSearch}
    onChange={e => setCocktailSearch(e.target.value)}
    style={{ padding: "0.5rem", width: "100%", marginBottom: "0.5rem" }}
  />
</div>
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
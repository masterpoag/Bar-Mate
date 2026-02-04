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
  


  const baseIngredients = [
  "vodka",
  "gin",
  "rum",
  "tequila",
  "triple sec",
  "lime juice",
  "tonic water",
  "orange juice",
  "sugar",
  "cola"
];

  const possibleCocktails = cocktailsData.map(cocktail => {
  const missingIngredients = cocktail.ingredients.filter(
    i => !selectedIngredients.includes(i)
  );
  return { ...cocktail, missingIngredients };
}).filter(c => c.missingIngredients.length <= 1);


// Ingredients we can show (start with base)
let smartIngredientsSet = new Set(baseIngredients);

// Loop through cocktails that can be made with 0 or 1 missing ingredients
possibleCocktails.forEach(cocktail => {
  cocktail.ingredients.forEach(i => {
    // Only add ingredients if they’re not already selected
    if (!selectedIngredients.includes(i)) {
      smartIngredientsSet.add(i);
    }
  });
});



// Convert to array and sort
const smartIngredients = Array.from(smartIngredientsSet).sort();


  function toggleIngredient(ingredient) {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  }

  const filteredIngredients = smartIngredients.filter(i =>
  i.toLowerCase().includes(ingredientSearch.toLowerCase())
);

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

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
  {smartIngredients.map(ingredient => (
    <label key={ingredient} style={{ display: "flex", alignItems: "center", gap: "0.25rem", border: "1px solid #ccc", padding: "0.25rem 0.5rem", borderRadius: "5px", background: selectedIngredients.includes(ingredient) ? "#d4edda" : "#f9f9f9", cursor: "pointer" }}>
      <input
        type="checkbox"
        checked={selectedIngredients.includes(ingredient)}
        onChange={() =>
          setSelectedIngredients(prev =>
            prev.includes(ingredient)
              ? prev.filter(i => i !== ingredient)
              : [...prev, ingredient]
          )
        }
      />
      <span style={{ textTransform: "capitalize", fontWeight: "500" }}>{ingredient}</span>
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
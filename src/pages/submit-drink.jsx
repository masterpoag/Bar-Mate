import React, { useState } from "react";

export default function SubmitDrinkPage({ user }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState({ name: "", amount: "", unit: "", modifier: "" });
  const [instructions, setInstructions] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const addIngredient = () => {
    if (!currentIngredient.name) return;
    setIngredients([...ingredients, { ...currentIngredient }]);
    setCurrentIngredient({ name: "", amount: "", unit: "", modifier: "" });
  };

  const removeIngredient = idx => setIngredients(ingredients.filter((_, i) => i !== idx));

  const submitDrink = async () => {
    if (!name || ingredients.length === 0) {
      setMessage("Please add a name and at least one ingredient");
      return;
    }

    const res = await fetch("/api/userDrinks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        ingredients,
        instructions,
        description,
        createdBy: user?.username || "anonymous"
      })
    });

    if (res.ok) {
      setMessage("Drink submitted! Awaiting approval.");
      setName(""); setIngredients([]); setInstructions(""); setDescription("");
    } else {
      setMessage("Failed to submit drink.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Submit a New Drink</h1>
      {message && <p>{message}</p>}

      <input placeholder="Drink Name" value={name} onChange={e => setName(e.target.value)} />
      <textarea placeholder="Instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />

      <div>
        <input placeholder="Ingredient Name" value={currentIngredient.name} onChange={e => setCurrentIngredient({ ...currentIngredient, name: e.target.value })} />
        <input placeholder="Amount" value={currentIngredient.amount} onChange={e => setCurrentIngredient({ ...currentIngredient, amount: e.target.value })} />
        <input placeholder="Unit" value={currentIngredient.unit} onChange={e => setCurrentIngredient({ ...currentIngredient, unit: e.target.value })} />
        <input placeholder="Modifier" value={currentIngredient.modifier} onChange={e => setCurrentIngredient({ ...currentIngredient, modifier: e.target.value })} />
        <button onClick={addIngredient}>Add Ingredient</button>
      </div>

      <ul>
        {ingredients.map((i, idx) => (
          <li key={idx}>
            {i.name} {i.amount} {i.unit} {i.modifier} <button onClick={() => removeIngredient(idx)}>Remove</button>
          </li>
        ))}
      </ul>

      <button onClick={submitDrink}>Submit Drink</button>
    </div>
  );
}

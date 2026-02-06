import React, { useState } from "react";

export default function SubmitDrinkPage({ user, darkMode }) {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState(user?.username || "");
  const [photo, setPhoto] = useState(""); // Photo link
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

  const removeIngredient = (idx) => {
    setIngredients(ingredients.filter((_, i) => i !== idx));
  };

  const submitDrink = async () => {
    // Validate required fields
    if (!name || !userName || !photo || ingredients.length === 0) {
      setMessage("Please provide your name, drink name, photo link, and at least one ingredient.");
      return;
    }

    try {
      const res = await fetch("/api/userDrinks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          ingredients,
          instructions,
          description,
          image: photo,
          createdBy: userName
        })
      });

      if (res.ok) {
        setMessage("Drink submitted! Awaiting approval.");
        // Clear all fields
        setName("");
        setUserName(user?.username || "");
        setPhoto("");
        setIngredients([]);
        setInstructions("");
        setDescription("");
      } else {
        const data = await res.json();
        setMessage(data.message || "Failed to submit drink.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error submitting drink.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Submit a New Drink</h1>
      {message && <p style={{ fontWeight: "bold" }}>{message}</p>}

      {/* User Name and Drink Info */}
      <input
        placeholder="Your Name"
        value={userName}
        onChange={e => setUserName(e.target.value)}
        style={{ display: "block", marginBottom: "0.5rem", padding: "0.5rem", width: "100%" }}
      />
      <input
        placeholder="Drink Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ display: "block", marginBottom: "0.5rem", padding: "0.5rem", width: "100%" }}
      />
      <input
        placeholder="Photo Link (required)"
        value={photo}
        onChange={e => setPhoto(e.target.value)}
        style={{ display: "block", marginBottom: "0.5rem", padding: "0.5rem", width: "100%" }}
      />
      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={e => setInstructions(e.target.value)}
        style={{ display: "block", marginBottom: "0.5rem", padding: "0.5rem", width: "100%" }}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ display: "block", marginBottom: "0.5rem", padding: "0.5rem", width: "100%" }}
      />

      {/* Ingredients */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Ingredient Name"
          value={currentIngredient.name}
          onChange={e => setCurrentIngredient({ ...currentIngredient, name: e.target.value })}
          style={{ marginRight: "0.3rem" }}
        />
        <input
          placeholder="Amount"
          value={currentIngredient.amount}
          onChange={e => setCurrentIngredient({ ...currentIngredient, amount: e.target.value })}
          style={{ marginRight: "0.3rem", width: "60px" }}
        />
        <input
          placeholder="Unit"
          value={currentIngredient.unit}
          onChange={e => setCurrentIngredient({ ...currentIngredient, unit: e.target.value })}
          style={{ marginRight: "0.3rem", width: "60px" }}
        />
        <input
          placeholder="Modifier"
          value={currentIngredient.modifier}
          onChange={e => setCurrentIngredient({ ...currentIngredient, modifier: e.target.value })}
          style={{ marginRight: "0.3rem", width: "100px" }}
        />
        <button onClick={addIngredient}>Add Ingredient</button>
      </div>

      {/* Ingredients */}
      <div style={sectionStyle}>
        <h3>Ingredients</h3>
        <div style={ingredientContainer}>
          <input style={ingredientInputStyle} placeholder="Name" value={currentIngredient.name} onChange={(e) => setCurrentIngredient({ ...currentIngredient, name: e.target.value })} />
          <input style={{ ...ingredientInputStyle, maxWidth: "70px" }} placeholder="Amount" value={currentIngredient.amount} onChange={(e) => setCurrentIngredient({ ...currentIngredient, amount: e.target.value })} />
          <input style={{ ...ingredientInputStyle, maxWidth: "70px" }} placeholder="Unit" value={currentIngredient.unit} onChange={(e) => setCurrentIngredient({ ...currentIngredient, unit: e.target.value })} />
          <input style={ingredientInputStyle} placeholder="Modifier" value={currentIngredient.modifier} onChange={(e) => setCurrentIngredient({ ...currentIngredient, modifier: e.target.value })} />
          <button style={addButtonStyle} onClick={addIngredient}>Add</button>
        </div>

        <ul style={ingredientListStyle}>
          {ingredients.map((i, idx) => (
            <li key={idx} style={{ marginBottom: "0.3rem" }}>
              {i.name} {i.amount} {i.unit} {i.modifier}
              <button style={removeButtonStyle} onClick={() => removeIngredient(idx)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={submitDrink} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
        Submit Drink
      </button>
    </div>
  );
}


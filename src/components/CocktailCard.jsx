export default function CocktailCard({ cocktail }) {
  return (
    <div style={cardStyle}>
      <h3>{cocktail.name}</h3>
      <p>
        <strong>Ingredients:</strong>{" "}
        {cocktail.ingredients.join(", ")}
      </p>
      {cocktail.instructions && (
        <p><strong>Instructions:</strong> {cocktail.instructions}</p>
      )}
    </div>
  );
}

// Simple inline style for now
const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "1rem",
  marginBottom: "1rem",
  backgroundColor: "#fff",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
};

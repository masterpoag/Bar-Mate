export default function CocktailCard({ cocktail }) {
  return (
    <div style={cardStyle}>
      {cocktail.image && (
        <img
          src={cocktail.image}
          alt={cocktail.name}
          style={{ width: "100%", maxHeight: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "0.5rem" }}
        />
      )}
      <h3>{cocktail.name}</h3>
      {cocktail.description && <p>{cocktail.description}</p>}
      <p><strong>Ingredients:</strong> {cocktail.ingredients.join(", ")}</p>
      {cocktail.instructions && <p><strong>Instructions:</strong> {cocktail.instructions}</p>}
      {cocktail.glass && <p><strong>Glass:</strong> {cocktail.glass}</p>}
      {cocktail.category && <p><strong>Category:</strong> {cocktail.category}</p>}
      {cocktail.alcoholic && <p><strong>Alcoholic:</strong> {cocktail.alcoholic}</p>}
      {cocktail.missingIngredients && cocktail.missingIngredients.length > 0 && (
        <p style={{ color: "red" }}>
          <strong>Missing ingredient{cocktail.missingIngredients.length > 1 ? "s" : ""}:</strong>{" "}
          {cocktail.missingIngredients.join(", ")}
        </p>
      )}
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "1rem",
  backgroundColor: "#fff",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
};

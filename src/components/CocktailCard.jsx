export default function CocktailCard({ cocktail, darkMode }) {
  const cardStyle = {
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: darkMode ? "0 4px 12px rgba(0,0,0,0.7)" : "0 4px 12px rgba(0,0,0,0.1)",
    background: darkMode ? "#1e1e1e" : "#fff",
    color: darkMode ? "#f5f5f5" : "#121212",
    transition: "all 0.3s",
    display: "flex",
    flexDirection: "column"
  };

  const imgStyle = {
    width: "100%",
    height: "180px",
    objectFit: "cover"
  };

  const contentStyle = { padding: "1rem", flex: 1 };

  const missingStyle = {
    color: "#ff6f61",
    fontWeight: "bold"
  };

  return (
    <div style={cardStyle}>
      {cocktail.image && <img src={cocktail.image} alt={cocktail.name} style={imgStyle} />}
      <div style={contentStyle}>
        <h3>{cocktail.name}</h3>
        {cocktail.instructions && <p><strong>Instructions:</strong> {cocktail.instructions}</p>}
        {cocktail.ingredients && <p><strong>Ingredients:</strong> {cocktail.ingredients.join(", ")}</p>}
        {cocktail.missingIngredients.length > 0 && (
          <p style={missingStyle}><strong>Missing:</strong> {cocktail.missingIngredients.join(", ")}</p>
        )}
      </div>
    </div>
  );
}

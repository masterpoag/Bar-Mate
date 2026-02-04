import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BarStockPage from "./pages/BarStockPage";
import CocktailsPage from "./pages/CocktailsPage";
import cocktailsData from "./data/cocktails.json";

function App() {
  const [barStock, setBarStock] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const navStyle = { display: "flex", gap: "1rem", marginBottom: "1rem" };
  const linkStyle = { textDecoration: "none", fontWeight: "bold" };

  return (
    <Router>
      <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
        <nav style={navStyle}>
          <Link to="/" style={linkStyle}>🍾 Bar Stock</Link>
          <Link to="/cocktails" style={linkStyle}>🍹 Cocktails</Link>
          <button
            onClick={() => setDarkMode(prev => !prev)}
            style={{ marginLeft: "auto" }}
          >
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <BarStockPage
                barStock={barStock}
                setBarStock={setBarStock}
                darkMode={darkMode}
                cocktailsData={cocktailsData}
              />
            }
          />
          <Route
            path="/cocktails"
            element={
              <CocktailsPage
                barStock={barStock}
                cocktailsData={cocktailsData}
                darkMode={darkMode}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

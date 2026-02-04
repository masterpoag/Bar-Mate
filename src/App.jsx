import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BarStockPage from "./pages/BarStockPage";
import CocktailsPage from "./pages/CocktailsPage";
import cocktailsData from "./data/cocktails.json";

function App() {
  const [barStock, setBarStock] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.body.style.background = darkMode ? "#121212" : "#f5f5f5";
    document.body.style.color = darkMode ? "#f5f5f5" : "#121212";
    document.body.style.transition = "all 0.3s";
  }, [darkMode]);

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

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BarStockPage from "./pages/BarStockPage";
import CocktailsPage from "./pages/CocktailsPage";
import cocktailsData from "./data/cocktails.json";

export default function App() {
  // Load from cookies or defaults
  const [barStock, setBarStock] = useState(() => {
    const saved = Cookies.get("barStock");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = Cookies.get("darkMode");
    return saved === "true" ? true : false;
  });

  // Save to cookies whenever barStock changes
  useEffect(() => {
    Cookies.set("barStock", JSON.stringify(barStock), { expires: 7 }); // 7 days
  }, [barStock]);

  // Save darkMode to cookies
  useEffect(() => {
    Cookies.set("darkMode", darkMode, { expires: 30 }); // 30 days
  }, [darkMode]);

  // Apply dark/light mode to body
  useEffect(() => {
    document.body.style.background = darkMode ? "#121212" : "#f5f5f5";
    document.body.style.color = darkMode ? "#f5f5f5" : "#121212";
  }, [darkMode]);

  return (
    <Router>
      <nav style={{ display: "flex", padding: "1rem", alignItems: "center" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Bar Stock</Link>
        <Link to="/cocktails">Cocktails</Link>

        <button
          onClick={() => setDarkMode(prev => !prev)}
          style={{
            marginLeft: "auto",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            background: darkMode ? "#333" : "#e0e0e0",
            color: darkMode ? "#f5f5f5" : "#121212",
            transition: "all 0.3s",
          }}
        >
          {darkMode ? "🌞" : "🌙"}
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
    </Router>
  );
}

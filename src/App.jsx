import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BarStockPage from "./pages/bar";
import CocktailsPage from "./pages/cocktails";
import cocktailsData from "./data/cocktails.json";
import SearchCocktailsPage from "./pages/search";
import HomePage from "./pages";

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

  // New: unit state (oz, ml, cl, tbsp, tsp)
  const [unit, setUnit] = useState(() => {
    const saved = Cookies.get("unit");
    return saved || "oz";
  });

  // Save to cookies whenever barStock changes
  useEffect(() => {
    Cookies.set("barStock", JSON.stringify(barStock), { expires: 7 });
  }, [barStock]);

  // Save darkMode to cookies
  useEffect(() => {
    Cookies.set("darkMode", darkMode, { expires: 30 });
  }, [darkMode]);

  // Save unit to cookies
  useEffect(() => {
    Cookies.set("unit", unit, { expires: 30 });
  }, [unit]);

  // Apply dark/light mode to body
  useEffect(() => {
    document.body.style.background = darkMode ? "#121212" : "#f5f5f5";
    document.body.style.color = darkMode ? "#f5f5f5" : "#121212";
  }, [darkMode]);

  return (
    <Router>
      <nav style={{ display: "flex", padding: "1rem", alignItems: "center" }}>
        <Link to="/bar" style={{ marginRight: "1rem" }}>Bar Stock</Link>
        <Link to="/cocktails" style={{ marginRight: "1rem" }}>Cocktails</Link>
        <Link to="/search" style={{ marginRight: "1rem" }}>Search All Cocktails</Link>

        {/* Unit selector */}
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          style={{
            marginLeft: "1rem",
            padding: "0.4rem 0.6rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          <option value="oz">oz</option>
          <option value="ml">ml</option>
          <option value="cl">cl</option>
          <option value="tbsp">tbsp</option>
          <option value="tsp">tsp</option>
        </select>

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
        <Route path="/" element={<HomePage darkMode={darkMode} />} /> 
        <Route
          path="/bar"
          element={
            <BarStockPage
              barStock={barStock}
              setBarStock={setBarStock}
              darkMode={darkMode}
              cocktailsData={cocktailsData}
              unit={unit}
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
              unit={unit}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchCocktailsPage
              cocktailsData={cocktailsData}
              barStock={barStock}
              darkMode={darkMode}
              unit={unit}
            />
          }
        />
      </Routes>
    </Router>
  );
}

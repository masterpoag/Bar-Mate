import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import BarStockPage from "./pages/bar";
import CocktailsPage from "./pages/cocktails";
import SearchCocktailsPage from "./pages/search";
import HomePage from "./pages";
import SubmitDrinkPage from "./pages/submitDrink";

const units = ["oz", "ml", "cl", "tbsp", "tsp"];

export default function App() {
  const [drinks, setDrinks] = useState([]);
  // Load from cookies or defaults
  const [barStock, setBarStock] = useState(() => {
    const saved = Cookies.get("barStock");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = Cookies.get("darkMode");
    return saved === "true" ? true : false;
  });

  const [unit, setUnit] = useState(() => {
    const saved = Cookies.get("unit");
    return saved || "oz";
  });

  // Save cookies
  useEffect(() => {
    Cookies.set("barStock", JSON.stringify(barStock), { expires: 7 });
  }, [barStock]);

  useEffect(() => {
    Cookies.set("darkMode", darkMode, { expires: 30 });
  }, [darkMode]);

  useEffect(() => {
    Cookies.set("unit", unit, { expires: 30 });
  }, [unit]);

  // Apply dark/light mode to body
  useEffect(() => {
    document.body.style.background = darkMode ? "#121212" : "#f5f5f5";
    document.body.style.color = darkMode ? "#f5f5f5" : "#121212";
  }, [darkMode]);

  useEffect(() => {
  fetch("/api/drinks")
    .then(res => res.json())
    .then(data => setDrinks(data))
    .catch(err => console.error("Failed to load drinks:", err));
  }, []);


  const navStyle = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    padding: "1rem",
    gap: "0.5rem",
    background: darkMode ? "#1e1e1e" : "#fff",
    boxShadow: darkMode
      ? "0 2px 6px rgba(0,0,0,0.7)"
      : "0 2px 6px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    margin: "0.5rem",
  };

  const linkStyle = {
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    background: darkMode ? "#333" : "#e0e0e0",
    color: darkMode ? "#f5f5f5" : "#121212",
    fontWeight: "bold",
    transition: "all 0.3s",
  };

  const unitButtonStyle = (u) => ({
    padding: "0.4rem 0.8rem",
    margin: "0 0.2rem",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: unit === u ? "bold" : "normal",
    background: unit === u
      ? darkMode ? "#ff6f61" : "#1976d2"
      : darkMode ? "#333" : "#e0e0e0",
    color: unit === u ? "#fff" : darkMode ? "#f5f5f5" : "#121212",
    transition: "all 0.3s",
  });

  const darkModeButtonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    background: darkMode ? "#333" : "#e0e0e0",
    color: darkMode ? "#f5f5f5" : "#121212",
    transition: "all 0.3s",
    marginLeft: "auto",
  };

  return (
    <Router>
      <nav style={navStyle}>
        {/* Navigation links */}
        <NavLink to="/bar" style={({ isActive }) => ({
          ...linkStyle,
          color: isActive ? "#ff6f61" : linkStyle.color
        })}>
          Bar Stock
        </NavLink>

        <NavLink to="/cocktails" style={({ isActive }) => ({
          ...linkStyle,
          color: isActive ? "#ff6f61" : linkStyle.color
        })}>
          Cocktails
        </NavLink>

        <NavLink to="/search" style={({ isActive }) => ({
          ...linkStyle,
          color: isActive ? "#ff6f61" : linkStyle.color
        })}>
          Search All Cocktails
        </NavLink>

        {/* Measurement buttons */}
        <div style={{ display: "flex", marginLeft: "1rem" }}>
          {units.map((u) => (
            <button
              key={u}
              style={unitButtonStyle(u)}
              onClick={() => setUnit(u)}
            >
              {u}
            </button>
          ))}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(prev => !prev)}
          style={darkModeButtonStyle}
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage darkMode={darkMode} />} /> 
        <Route path="/submit-drink" element={<SubmitDrinkPage darkMode={darkMode} />} /> 
        <Route
          path="/bar"
          element={
            <BarStockPage
              barStock={barStock}
              setBarStock={setBarStock}
              darkMode={darkMode}
              cocktailsData={drinks}
              unit={unit}
            />
          }
        />
        <Route
          path="/cocktails"
          element={
            <CocktailsPage
              barStock={barStock}
              cocktailsData={drinks}
              darkMode={darkMode}
              unit={unit}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchCocktailsPage
              cocktailsData={drinks}
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

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BarStockPage from "./pages/BarStockPage";
import CocktailsPage from "./pages/CocktailsPage";
import { useState } from "react";
import cocktailsData from "./data/cocktails.json";

function App() {
  const [barStock, setBarStock] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const appStyle = {
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    padding: "1rem",
    background: darkMode ? "#121212" : "#f5f5f5",
    color: darkMode ? "#f5f5f5" : "#121212",
    transition: "all 0.3s"
  };

  const navStyle = {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem"
  };

  const linkStyle = {
    textDecoration: "none",
    color: darkMode ? "#f5f5f5" : "#121212",
    fontWeight: "bold"
  };

  return (
    <Router>
      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route
            path="/"
            element={
              <BarStockPage
                barStock={barStock}
                setBarStock={setBarStock}
                darkMode={darkMode}
                cocktailsData={cocktailsData} // ✅ pass the data
              />
            }
          />
          <Route
            path="/cocktails"
            element={
              <CocktailsPage
                barStock={barStock}
                cocktailsData={cocktailsData} // ✅ also here
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

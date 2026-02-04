import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BarStockPage from "./pages/BarStockPage";
import CocktailsPage from "./pages/CocktailsPage";
import { useState } from "react";
import cocktailsData from "./data/cocktails.json";

function App() {
  const [barStock, setBarStock] = useState([]);

  return (
    <Router>
      <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
        <nav style={{ marginBottom: "1rem" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>🍾 Bar Stock</Link>
          <Link to="/cocktails">🍹 Cocktails</Link>
        </nav>

        <Routes>
          <Route path="/" element={<BarStockPage barStock={barStock} setBarStock={setBarStock} />} />
          <Route path="/cocktails" element={<CocktailsPage barStock={barStock} cocktailsData={cocktailsData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

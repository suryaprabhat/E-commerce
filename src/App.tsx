import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ProductList } from "./pages/ProductList";
import { Details } from "./pages/Details";
import "./styles/layout.css";
import "./styles/components.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/category/:categoryName" element={<ProductList />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;

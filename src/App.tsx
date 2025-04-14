import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ProductList } from "./pages/ProductList";
import { Details } from "./pages/Details";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles/layout.css";
import "./styles/components.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Add a skip link if you add persistent navigation later */}
        {/* <a href="#main-content" className="skip-link">Skip to main content</a> */}
        <main id="main-content"> {/* Wrap content in main */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/category/:categoryName" element={<ProductList />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </main>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          aria-label="Notification Region"
        />
      </div>
    </Router>
  );
}
export default App;

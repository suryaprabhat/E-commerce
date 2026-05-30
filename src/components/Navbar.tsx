import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">🛍️</span>
        <span className="brand-name">Elegant Living</span>
      </Link>

      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Products</Link>
        {isAdmin && <Link to="/admin" className="nav-link admin-link">⚙️ Admin</Link>}
        {user && <Link to="/orders" className="nav-link">My Orders</Link>}
      </div>

      <div className="navbar-actions">
        <Link to="/cart" className="cart-btn" id="cart-icon">
          🛒
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>

        {user ? (
          <div className="user-menu">
            <span className="user-greeting">Hi, {user.name.split(' ')[0]}</span>
            {isAdmin && <span className="admin-badge">Admin</span>}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <Link to="/login" className="login-nav-btn">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

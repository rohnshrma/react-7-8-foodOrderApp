import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";

const App = () => {
  return (
    <>
      {/* Navbar: visible on all pages */}
      <nav className="navbar navbar-expand-lg navbar-dark navbar-zomato shadow-sm">
        {/* Brand/logo: clicking takes you to the home (menu) page */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="navbar-zomato__logo">foodie</span>
          <span className="navbar-zomato__divider" />
          <span className="navbar-zomato__title">Food Order</span>
        </Link>
        {/* Hamburger button for mobile screens (Bootstrap collapse behavior) */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Collapsible links container */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link navbar-zomato__link" to="/">
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navbar-zomato__link" to="/cart">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link navbar-zomato__link navbar-zomato__cta"
                to="/add"
              >
                Add item
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Routes: decides which page component to render based on the URL path */}
      <Routes>
        {/* Home route: shows the Menu page */}
        <Route path="/" element={<Menu />} />
        {/* Add route: shows the Add Product form */}
        <Route path="/add" element={<AddProduct />} />
        {/* Cart route: shows the Cart page */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;

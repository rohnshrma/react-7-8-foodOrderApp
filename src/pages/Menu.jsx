// This file defines the "Menu" page (the home screen).
// It shows a grid of dish cards.

import React from "react";

// MenuCard is a reusable component that displays a single dish.
import MenuCard from "../components/MenuCard";

// Menu is a React component.
//
// Props (inputs from parent):
// - dishes: an array of dish objects to display
// - onAddToCart: a function to call when user clicks "Add to cart" on a card
const Menu = ({ dishes, onAddToCart }) => {
  // The return value of a component is JSX (a syntax that looks like HTML).
  // JSX is converted to JavaScript under the hood by the build tool.
  return (
    // Outer wrapper for page background
    <div className="menu-page">
      {/* Bootstrap container: centers content and adds responsive horizontal padding */}
      <div className="container py-3 py-md-4">
        {/* Page header */}
        <div className="menu-page__header">
          <h2 className="menu-page__title">Order your favourites</h2>
          <p className="menu-page__subtitle">
            Fresh picks, Zomato-style vibes — add items to your cart in seconds.
          </p>
        </div>

        {/* Bootstrap row: used with col-* for grid layout */}
        <div className="row z-row-tight">
          {/* We loop over dishes using map() and render a MenuCard for each dish. */}
          {dishes.map((dish) => {
            // "key" is required by React when rendering a list.
            // It helps React efficiently update the DOM when items change.
            return (
              <MenuCard
                dish={dish}
                key={dish.id}
                // Pass the click handler down so the card can call it.
                onAddToCart={onAddToCart}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Export so other files can import and use <Menu />.
export default Menu;

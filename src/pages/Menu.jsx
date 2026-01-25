import React from "react";

import MenuCard from "../components/MenuCard";

const Menu = ({ dishes, onAddToCart }) => {
  return (
    <div className="menu-page">
      <div className="container py-3 py-md-4">
        <div className="menu-page__header">
          <h2 className="menu-page__title">Order your favourites</h2>
          <p className="menu-page__subtitle">
            Fresh picks, Zomato-style vibes — add items to your cart in seconds.
          </p>
        </div>

        <div className="row z-row-tight">
          {dishes.map((dish) => {
            return (
              <MenuCard dish={dish} key={dish.id} onAddToCart={onAddToCart} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;

// This file defines a reusable "MenuCard" component.
// Each card displays one dish and a button to add it to cart.

import React from "react";

// MenuCard is a React component that receives props (inputs).
//
// Props:
// - dish: an object like { id, name, price, imageUrl, description, type, category }
// - onAddToCart: a function provided by the parent (App/Menu) to handle adding to cart
const MenuCard = ({ dish, onAddToCart }) => {
  // Destructuring pulls properties from the dish object into local variables.
  // This is just convenience so we can write "name" instead of "dish.name".
  const { name, price, imageUrl, description, type, category } = dish;

  // clickHandler is called when user clicks the "Add to cart" button.
  // We call the parent-provided function and pass it the current dish.
  const clickHandler = () => {
    onAddToCart(dish);
  };

  // Return the JSX for one card.
  return (
    // Bootstrap columns decide how many cards per row on different screen sizes.
    <div className="col-sm-6 col-lg-4 mb-3 menuCard">
      {/* card: Bootstrap base card class, z-card: our Zomato-like custom style */}
      <div className="card z-card h-100">
        {/* Media section (image + badges overlay) */}
        <div className="z-card__media">
          {/* Image */}
          <img
            src={imageUrl}
            className="card-img-top z-card__img"
            alt={name}
          />

          {/* Badges row that sits on the image */}
          <div className="z-card__badges">
            {/* Type badge: the class changes based on veg/nonveg */}
            <span
              className={`z-badge z-badge--${
                type === "veg" ? "veg" : "nonveg"
              }`}
            >
              {/* A small dot that becomes green/red via CSS */}
              <span className="z-badge__dot" />
              {/* Conditional text based on type */}
              {type === "veg" ? "Veg" : "Non-veg"}
            </span>

            {/* Category pill */}
            <span className="z-pill">{category}</span>
          </div>
        </div>

        {/* Body section (text + button) */}
        <div className="card-body d-flex flex-column">
          {/* Top row: dish name on left, price on right */}
          <div className="d-flex align-items-start justify-content-between mb-2">
            <h5 className="card-title z-card__title mb-0">{name}</h5>
            <div className="z-card__price">₹{price}</div>
          </div>

          {/* Description (CSS clamps it to 2 lines) */}
          <p className="card-text z-card__desc mb-2">{description}</p>

          {/* Bottom row: hint + button, mt-auto pushes it to bottom of the card */}
          <div className="mt-auto d-flex align-items-center justify-content-between">
            <small className="text-muted z-card__meta">Best with friends</small>

            {/* type="button" prevents it from acting like a submit button in forms */}
            <button
              onClick={clickHandler}
              type="button"
              className="btn btn-zomato"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export so other files can use <MenuCard />.
export default MenuCard;

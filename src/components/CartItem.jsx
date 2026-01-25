// This file defines one cart row UI (a single item inside the cart).
// It is a presentational component: it shows data and calls callbacks when buttons are clicked.

import React from "react";

// Props:
// - item: the cart item object (id, name, price, imageUrl, category, type, quantity)
// - onRemove: callback to remove the item from cart
// - onUpdate: callback to change quantity (+1 or -1)
const CartItem = ({ item, onRemove, onUpdate }) => {
  // item || {} prevents errors if item is undefined.
  // Destructure to get properties we need.
  const { id, name, price, imageUrl, category, type, quantity } = item || {};

  return (
    // Root row container
    <div className="cart-item">
      {/* Thumbnail (image) */}
      <div className="cart-item__imgWrap">
        <img
          className="cart-item__img"
          src={imageUrl}
          // alt text is important for accessibility (screen readers) and SEO.
          alt={name || "Cart item"}
          // loading="lazy" tells the browser to load the image only when needed (performance).
          loading="lazy"
        />
      </div>

      {/* Right side: all text + buttons */}
      <div className="cart-item__info">
        <div className="cart-item__top">
          <div>
            <div className="cart-item__name">{name}</div>
            <div className="cart-item__meta">
              {/* Veg / Non-veg badge (moved out of image so it doesn't cover the thumbnail) */}
              <span
                className={`cart-item__type cart-item__type--${
                  type === "veg" ? "veg" : "nonveg"
                }`}
              >
                <span className="cart-item__dot" />
                {type === "veg" ? "Veg" : "Non-veg"}
              </span>
              {/* Category pill */}
              <span className="cart-item__pill">{category}</span>
            </div>
          </div>

          {/* Remove button */}
          <button
            type="button"
            className="btn cart-item__remove"
            aria-label="Remove item"
            onClick={() => {
              // Call parent callback with the id so parent can remove it from state.
              onRemove(id);
            }}
          >
            ×
          </button>
        </div>

        <div className="cart-item__bottom">
          {/* Price display */}
          <div className="cart-item__price">₹{price}</div>

          {/* Quantity controls */}
          <div className="cart-item__qty">
            {/* Decrease quantity */}
            <button
              type="button"
              className="btn cart-item__qtyBtn"
              aria-label="Decrease quantity"
              onClick={() => {
                // Tell parent to update this item's quantity by -1.
                // Parent reducer decides what to do (e.g., remove if quantity reaches 0).
                onUpdate({ id, update: -1 });
              }}
            >
              −
            </button>
            {/* Current quantity number */}
            <span className="cart-item__qtyValue">{quantity}</span>
            {/* Increase quantity */}
            <button
              type="button"
              className="btn cart-item__qtyBtn"
              aria-label="Increase quantity"
              onClick={() => {
                // Tell parent to update quantity by +1.
                onUpdate({ id, update: +1 });
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

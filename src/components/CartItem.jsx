import React from "react";

const CartItem = ({ item, onRemove, onUpdate }) => {
  const { id, name, price, imageUrl, category, type, quantity } = item || {};

  return (
    <div className="cart-item">
      <div className="cart-item__imgWrap">
        <img
          className="cart-item__img"
          src={imageUrl}
          alt={name || "Cart item"}
          loading="lazy"
        />
      </div>

      <div className="cart-item__info">
        <div className="cart-item__top">
          <div>
            <div className="cart-item__name">{name}</div>
            <div className="cart-item__meta">
              <span
                className={`cart-item__type cart-item__type--${
                  type === "veg" ? "veg" : "nonveg"
                }`}
              >
                <span className="cart-item__dot" />
                {type === "veg" ? "Veg" : "Non-veg"}
              </span>
              <span className="cart-item__pill">{category}</span>
            </div>
          </div>

          <button
            type="button"
            className="btn cart-item__remove"
            aria-label="Remove item"
            onClick={() => {
              onRemove(id);
            }}
          >
            ×
          </button>
        </div>

        <div className="cart-item__bottom">
          <div className="cart-item__price">₹{price}</div>

          <div className="cart-item__qty">
            <button
              type="button"
              className="btn cart-item__qtyBtn"
              aria-label="Decrease quantity"
              onClick={() => {
                onUpdate({ id, update: -1 });
              }}
            >
              −
            </button>
            <span className="cart-item__qtyValue">{quantity}</span>
            <button
              type="button"
              className="btn cart-item__qtyBtn"
              aria-label="Increase quantity"
              onClick={() => {
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

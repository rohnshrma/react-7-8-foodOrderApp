// This page shows the cart UI (items list + summary).
// Most of the "business logic" (calculations, updating quantities) is handled elsewhere (App reducer).

import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

// Link is used to navigate back to the menu without a full page reload.
import { Link } from "react-router-dom";

// CartItem is a reusable component that displays one item row in the cart.
import CartItem from "../components/CartItem";

const Cart = () => {
  const { cart } = useContext(CartContext);

  // `cart` is expected to be an object like: { cartItems: [...], total: number }
  // Optional chaining (?.) prevents crashes if cart is undefined.
  // If cart is missing, we fallback to an empty list.
  const items = cart?.cartItems || [];

  // Nullish coalescing (??) means:
  // - use cart.total if it's not null/undefined
  // - otherwise use 0
  const total = cart?.total ?? 0;

  return (
    <div className="cart-page">
      <div className="container py-3 py-md-4">
        <div className="cart-page__header">
          <div>
            <h2 className="cart-page__title">Your cart</h2>
            <p className="cart-page__subtitle">
              {/* Conditional text: different message when cart is empty */}
              {items.length === 0
                ? "Start adding dishes from the menu."
                : "Review items, apply offers, then checkout."}
            </p>
          </div>
          {/* Only show the "Continue shopping" button when there are items */}
          {items.length > 0 && (
            <Link to="/" className="btn btn-zomato-outline cart-page__back">
              Continue shopping
            </Link>
          )}
        </div>

        {/* Conditional rendering:
            If cart is empty -> show empty state
            Else -> show items + summary
        */}
        {items.length === 0 ? (
          <div className="z-card cart-empty">
            <div className="cart-empty__inner">
              <div className="cart-empty__icon">🛒</div>
              <h4 className="cart-empty__title">Your cart is empty</h4>
              <p className="cart-empty__text">
                Add some delicious dishes to get started.
              </p>
              <Link to="/" className="btn btn-zomato">
                Go to menu
              </Link>
            </div>
          </div>
        ) : (
          <div className="row z-row-tight">
            <div className="col-lg-8 mb-3">
              <div className="z-card cart-card">
                <div className="cart-card__header">
                  <div className="cart-card__title">
                    Items{" "}
                    <span className="cart-card__count">({items.length})</span>
                  </div>
                  <small className="cart-card__note">
                    {/* This is just UI text; your reducer/handlers control actual updates */}
                  </small>
                </div>

                <div className="cart-card__body">
                  {/* Render one CartItem for each item in the cart */}
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      // item is the data object for that row
                      item={item}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-3">
              <div className="z-card cart-summary">
                <div className="cart-summary__header">Order summary</div>

                <div className="cart-summary__body">
                  <div className="cart-summary__coupon">
                    <label className="cart-summary__label">Apply coupon</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., ZOMATO50"
                        aria-label="Coupon code"
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-zomato-outline"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                    <small className="text-muted cart-summary__hint">
                      Offer validation is handled by your logic.
                    </small>
                  </div>

                  <div className="cart-summary__lines">
                    {/* Summary line: subtotal (we display the total passed in) */}
                    <div className="cart-line">
                      <span className="cart-line__label">Subtotal</span>
                      <span className="cart-line__value">₹{total}</span>
                    </div>
                    <div className="cart-line">
                      <span className="cart-line__label">Delivery</span>
                      <span className="cart-line__value cart-line__muted">
                        Calculated
                      </span>
                    </div>
                    <div className="cart-line">
                      <span className="cart-line__label">Taxes</span>
                      <span className="cart-line__value cart-line__muted">
                        Calculated
                      </span>
                    </div>
                    <div className="cart-line cart-line--total">
                      <span className="cart-line__label">To pay</span>
                      <span className="cart-line__value">₹{total}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-zomato btn-block cart-summary__cta"
                  >
                    Proceed to checkout
                  </button>
                  <small className="cart-summary__foot text-muted">
                    Secure payments • Fast delivery • Easy refunds
                  </small>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

const Cart = ({ cart, onRemove, onUpdate }) => {
  const items = cart?.cartItems || [];
  const total = cart?.total ?? 0;

  return (
    <div className="cart-page">
      <div className="container py-3 py-md-4">
        <div className="cart-page__header">
          <div>
            <h2 className="cart-page__title">Your cart</h2>
            <p className="cart-page__subtitle">
              {items.length === 0
                ? "Start adding dishes from the menu."
                : "Review items, apply offers, then checkout."}
            </p>
          </div>
          {items.length > 0 && (
            <Link to="/" className="btn btn-zomato-outline cart-page__back">
              Continue shopping
            </Link>
          )}
        </div>

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
                    {/* Quantity & price updates are handled by your logic. */}
                  </small>
                </div>

                <div className="cart-card__body">
                  {items.map((item) => (
                    <CartItem
                      onUpdate={onUpdate}
                      onRemove={onRemove}
                      key={item.id}
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

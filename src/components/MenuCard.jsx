import React from "react";

const MenuCard = ({ dish, onAddToCart }) => {
  const { name, price, imageUrl, description, type, category } = dish;

  const clickHandler = () => {
    onAddToCart(dish);
  };
  return (
    <div className="col-sm-6 col-lg-4 mb-3 menuCard">
      <div className="card z-card h-100">
        <div className="z-card__media">
          <img src={imageUrl} className="card-img-top z-card__img" alt={name} />
          <div className="z-card__badges">
            <span
              className={`z-badge z-badge--${
                type === "veg" ? "veg" : "nonveg"
              }`}
            >
              <span className="z-badge__dot" />
              {type === "veg" ? "Veg" : "Non-veg"}
            </span>
            <span className="z-pill">{category}</span>
          </div>
        </div>

        <div className="card-body d-flex flex-column">
          <div className="d-flex align-items-start justify-content-between mb-2">
            <h5 className="card-title z-card__title mb-0">{name}</h5>
            <div className="z-card__price">₹{price}</div>
          </div>

          <p className="card-text z-card__desc mb-2">{description}</p>

          <div className="mt-auto d-flex align-items-center justify-content-between">
            <small className="text-muted z-card__meta">Best with friends</small>
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

export default MenuCard;

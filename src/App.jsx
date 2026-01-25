import React, { useReducer, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import { v4 as uuidv4 } from "uuid";
import { data } from "./data/dishes.js";

const initialState = {
  cartItems: [],
  total: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const dish = action.payload;

    const existingItem = state.cartItems.find((item) => item.id === dish.id);

    if (existingItem) {
      const updatedItems = state.cartItems.map((item) => {
        return item.id === dish.id
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...state,
        cartItems: updatedItems,
        total: updatedTotal,
      };
    } else {
      return {
        ...state,
        cartItems: [...state.cartItems, { ...dish, quantity: 1 }],
        total: state.total + dish.price,
      };
    }
  } else if (action.type === "REMOVE") {
    const id = action.payload;

    const existingItem = state.cartItems.find((item) => item.id === id);

    if (!existingItem) {
      return state;
    }

    let updatedItems = state.cartItems.filter((item) => item.id !== id);
    const updatedTotal = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      ...state,
      cartItems: updatedItems,
      total: updatedTotal,
    };
  } else if (action.type === "UPDATE") {
    let { id, update } = action.payload;

    const existingItem = state.cartItems.find((item) => item.id === id);

    if (!existingItem) {
      return state;
    }

    let updatedItems = state.cartItems
      .map((item) => {
        if (item.id === id) {
          let updatedQuantity = item.quantity + update;

          if (updatedQuantity < 1) return null;

          return { ...item, quantity: updatedQuantity };
        }

        return item;
      })
      .filter(Boolean);

    const updatedTotal = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      ...state,
      cartItems: updatedItems,
      total: updatedTotal,
    };
  }

  return state;
};

const App = () => {
  const [dishes, setDishes] = useState([
    ...data.map((dish) => {
      return { ...dish, id: uuidv4() };
    }),
  ]);
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addDishToCart = (dish) => {
    dispatch({ type: "ADD", payload: dish });
  };
  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  const updateCartHandler = (updateObj) => {
    console.log("update obj", updateObj);
    dispatch({ type: "UPDATE", payload: updateObj });
  };

  const addNewDishHandler = (dish) => {
    setDishes((prevDishes) => [dish, ...prevDishes]);
  };

  console.log(dishes);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-zomato shadow-sm">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="navbar-zomato__logo">foodie</span>
          <span className="navbar-zomato__divider" />
          <span className="navbar-zomato__title">Food Order</span>
        </Link>
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

      <Routes>
        <Route
          path="/"
          element={<Menu onAddToCart={addDishToCart} dishes={dishes} />}
        />
        <Route path="/add" element={<AddProduct onAdd={addNewDishHandler} />} />
        <Route
          path="/cart"
          element={
            <Cart
              onUpdate={updateCartHandler}
              onRemove={removeFromCart}
              cart={cart}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;

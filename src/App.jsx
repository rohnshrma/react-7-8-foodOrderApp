// React is the library that lets us build UI using components.
// We import React (needed for JSX in some setups) plus hooks like useState and useReducer.
//
// - useState: stores a piece of state (data) inside a component.
// - useReducer: an alternative to useState that is great for more complex state updates.
import React, { useReducer, useState } from "react";

// react-router-dom provides routing (multiple pages in a single-page app).
//
// - Link: navigates without full page refresh (like <a>, but SPA-friendly).
// - Routes: container that chooses which route to render.
// - Route: maps a URL path (like \"/cart\") to a component.
import { Link, Routes, Route } from "react-router-dom";

// Bootstrap CSS gives us ready-made UI classes (grid, buttons, spacing, etc.).
// Importing it here applies Bootstrap styles to the whole app.
import "bootstrap/dist/css/bootstrap.min.css";

// Our custom CSS (Zomato theme + page styles).
import "./App.css";

// Pages (top-level screens).
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";

// uuid is a small library to create unique IDs.
// v4 generates random unique IDs like \"9b1deb4d-...\".
// We use this so each dish can have a stable unique key/id.
import { v4 as uuidv4 } from "uuid";

// Our initial dishes list (plain data objects).
// NOTE: In your data file, the exported name is `data`.
import { data } from "./data/dishes.js";

// -----------------------------
// CART STATE (useReducer)
// -----------------------------
// This is the *shape* of the cart state.
// - cartItems: array of items in the cart. Each item will have quantity.
// - total: total price of everything in the cart.
const initialState = {
  cartItems: [],
  total: 0,
};

// A reducer is just a function that decides how state should change.
// It receives:
// - state: the *current* state value
// - action: an object that describes \"what happened\"
//
// Convention:
// action = { type: \"SOME_ACTION\", payload: anyData }
//
// IMPORTANT RULE: We do NOT mutate state directly in reducers.
// Instead, we return a NEW object/array (immutability).
const cartReducer = (state, action) => {
  // ADD = add an item to cart OR increase its quantity if already present.
  if (action.type === "ADD") {
    // The payload contains the dish object we want to add.
    const dish = action.payload;

    // find() searches the array and returns the first matching item (or undefined).
    // Here, we're checking if this dish is already in cartItems.
    const existingItem = state.cartItems.find((item) => item.id === dish.id);

    // If the item already exists, we increase quantity.
    if (existingItem) {
      // map() creates a new array by transforming each element.
      // We return a new item object for the matching id, otherwise we return the same item.
      const updatedItems = state.cartItems.map((item) => {
        return item.id === dish.id
          ? { ...item, quantity: item.quantity + 1 } // spread (...) copies fields, then overrides quantity
          : item;
      });

      // reduce() aggregates an array into a single value (here: total cost).
      // sum starts at 0, and we add (price * quantity) for each item.
      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Return the NEW state object.
      // We spread the old state so we keep any other fields, then overwrite cartItems + total.
      return {
        ...state,
        cartItems: updatedItems,
        total: updatedTotal,
      };
    } else {
      // If it's not in the cart yet, we add it with quantity: 1.
      // [...state.cartItems, newItem] creates a NEW array with the new item appended.
      return {
        ...state,
        cartItems: [...state.cartItems, { ...dish, quantity: 1 }],
        total: state.total + dish.price,
      };
    }
  }

  // REMOVE = remove the entire item from the cart by id.
  else if (action.type === "REMOVE") {
    // payload holds the id of the item to remove.
    const id = action.payload;

    // Check whether the item exists.
    const existingItem = state.cartItems.find((item) => item.id === id);

    // If item doesn't exist, do nothing.
    if (!existingItem) {
      return state;
    }

    // filter() creates a new array with items that pass the test.
    // Here we keep everything except the removed id.
    let updatedItems = state.cartItems.filter((item) => item.id !== id);

    // Recalculate total from scratch to avoid drift/bugs.
    const updatedTotal = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Return new state.
    return {
      ...state,
      cartItems: updatedItems,
      total: updatedTotal,
    };
  }

  // UPDATE = increase or decrease quantity by some amount.
  // Example payload: { id: \"abc\", update: +1 } or { id: \"abc\", update: -1 }
  else if (action.type === "UPDATE") {
    // Destructure the payload to get id and update amount.
    let { id, update } = action.payload;

    // Find the item we want to update.
    const existingItem = state.cartItems.find((item) => item.id === id);

    // If not found, do nothing.
    if (!existingItem) {
      return state;
    }

    // We map to update the matching item, and remove it if quantity becomes < 1.
    // Steps:
    // 1) map(): return updated item or null
    // 2) filter(Boolean): remove null values
    let updatedItems = state.cartItems
      .map((item) => {
        if (item.id === id) {
          // New quantity = old quantity + update (+1 or -1).
          let updatedQuantity = item.quantity + update;

          // If quantity drops below 1, we remove the item by returning null.
          if (updatedQuantity < 1) return null;

          // Otherwise, return a new object with updated quantity.
          return { ...item, quantity: updatedQuantity };
        }

        // For items that are not being updated, return them unchanged.
        return item;
      })
      // filter(Boolean) removes any falsy values (null, undefined, false, 0, \"\", etc.).
      // We used null above as \"remove this item\".
      .filter(Boolean);

    // Recalculate total again based on updatedItems.
    const updatedTotal = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Return the updated state.
    return {
      ...state,
      cartItems: updatedItems,
      total: updatedTotal,
    };
  }

  // If the action type is not recognized, return the existing state unchanged.
  return state;
};

const App = () => {
  // -----------------------------
  // DISHES STATE (useState)
  // -----------------------------
  // dishes is an array of dish objects shown on the Menu page.
  // setDishes lets us update that array (for example, when adding a new dish).
  //
  // We start from `data` (from dishes.js) and add an id to each dish so:
  // - React keys are stable
  // - Cart can match items by id
  const [dishes, setDishes] = useState([
    ...data.map((dish) => {
      // Create a new object that includes all original dish fields + a new id.
      return { ...dish, id: uuidv4() };
    }),
  ]);

  // cart is the current cart state object (cartItems + total).
  // dispatch is how we send actions to the reducer.
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // -----------------------------
  // CART ACTION HELPERS
  // -----------------------------
  // These are helper functions we pass down to components as props.
  // They call dispatch() with the correct action objects.

  // Add an item to cart.
  const addDishToCart = (dish) => {
    dispatch({ type: "ADD", payload: dish });
  };

  // Remove an item completely from cart.
  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  // Update quantity (+1 / -1).
  // updateObj should look like: { id: \"...\", update: +1 } or { id: \"...\", update: -1 }
  const updateCartHandler = (updateObj) => {
    console.log("update obj", updateObj);
    dispatch({ type: "UPDATE", payload: updateObj });
  };

  // -----------------------------
  // ADD PRODUCT HANDLER
  // -----------------------------
  // When AddProduct page submits a new dish, it calls onAdd(dish).
  // We insert it at the front of the dishes array so it shows up at the top.
  const addNewDishHandler = (dish) => {
    // Functional update: receives previous state and returns next state.
    setDishes((prevDishes) => [dish, ...prevDishes]);
  };

  // Debug: log dishes to the console (optional).
  console.log(dishes);
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
        <Route
          path="/"
          element={<Menu onAddToCart={addDishToCart} dishes={dishes} />}
        />
        {/* Add route: shows the Add Product form */}
        <Route path="/add" element={<AddProduct onAdd={addNewDishHandler} />} />
        {/* Cart route: shows the Cart page */}
        <Route
          path="/cart"
          element={
            <Cart
              // Functions passed down so CartItem buttons can call them.
              onUpdate={updateCartHandler}
              onRemove={removeFromCart}
              // Cart state object (items + total)
              cart={cart}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;

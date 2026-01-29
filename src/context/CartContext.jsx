import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  cartItems: [],
  total: 0,
};

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

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

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

 return <CartContext.Provider
    value={{ cart, addDishToCart, removeFromCart, updateCartHandler }}
  >
    {children}
  </CartContext.Provider>;
};

export default CartProvider;

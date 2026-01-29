// This file sets up a React Context for "dishes" (the menu items).
// Context lets us share data (like dishes + a function to add new dishes)
// with many components **without** having to pass props through every level.

// We import two things from React:
//
// - createContext: used to create a Context object
// - useState: a hook to store state inside a component
import { createContext, useState } from "react";

// We import the initial dishes data (an array of dish objects).
// `../` means "go up one folder", from `context/` to `src/`.
import { data } from "../data/dishes";

// uuid is a library to generate unique IDs.
// v4 is the function that creates random unique identifiers.
import { v4 as uuidv4 } from "uuid";

// ---------------------
// 1. CREATE CONTEXT
// ---------------------

// We create a Context for dish data.
// Any component that calls `useContext(DishContext)` will be able to read its value.
//
// Example usage in another component:
//   const { dishes, addNewDishHandler } = useContext(DishContext);
export const DishContext = createContext();

// ---------------------
// 2. PROVIDER COMPONENT
// ---------------------
//
// DishProvider is a React component that wraps part of our app
// and provides the dish state + "add new dish" function to its children.
//
// It receives `children` as a prop:
//   <DishProvider>
//     {children go here}
//   </DishProvider>
const DishProvider = ({ children }) => {
  // We want `dishes` state to start with our static `data` array.
  // But we also want each dish to have a unique `id` field.
  //
  // useState returns:
  // - dishes: the current array of dish objects
  // - setDishes: a function to update that array
  const [dishes, setDishes] = useState([
    // Spread operator `...` breaks the array returned by map into individual items,
    // so they become elements of the new array literal.
    ...data.map((dish) => {
      // For each dish in the original data, create a NEW object that:
      // - copies all its properties (`name`, `price`, etc.)
      // - adds an `id` property using uuidv4()
      //
      // This ensures every dish has a stable unique ID for React keys and cart logic.
      return { ...dish, id: uuidv4() };
    }),
  ]);

  // -------------------------
  // addNewDishHandler
  // -------------------------
  //
  // This function will be called when the Add Product page submits a new dish.
  // It receives a `dish` object as an argument.
  const addNewDishHandler = (dish) => {
    // We use the **functional** form of setState:
    //
    // setDishes((prevDishes) => { ... })
    //
    // This is recommended when the new state depends on the previous state,
    // because React might batch state updates.
    //
    // Here we return a NEW array where the new dish is placed at the **front**
    // so it appears at the top of the menu.
    setDishes((prevDishes) => [dish, ...prevDishes]);
  };

  // -------------------------
  // PROVIDE CONTEXT VALUE
  // -------------------------
  //
  // We return a Context.Provider component.
  //
  // - The `value` prop is what consumers (useContext) will see.
  // - We pass both:
  //     - dishes: current list of dishes
  //     - addNewDishHandler: function to add more dishes
  //
  // {children} represents whatever we wrap with <DishProvider> higher in the tree.
  return (
    <DishContext.Provider value={{ dishes, addNewDishHandler }}>
      {children}
    </DishContext.Provider>
  );
};

// Export the provider so we can wrap our app with it (typically in main.jsx or App.jsx).
export default DishProvider;

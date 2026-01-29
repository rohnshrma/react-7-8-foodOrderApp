// This page shows a form to add a new dish/product.
// It uses a reducer to manage many input fields as a single state object.

import React, { useReducer, useContext } from "react";
import { DishContext } from "../context/DishContext";
// Bootstrap CSS for layout + form styling (inputs, grid, etc.)
import "bootstrap/dist/css/bootstrap.min.css";

// Our custom Zomato-theme CSS
import "../App.css";

// uuid helps us create a unique id for each newly added dish.
import { v4 as uuidv4 } from "uuid";

// initialState is the first value for our form state.
// Each property corresponds to a form field.
const initialState = {
  name: "", // dish name (string)
  price: 0, // dish price (number-like; inputs still give strings)
  imageUrl: "", // image URL (string)
  description: "", // description (string)
  type: "", // "veg" or "non-veg" (string)
  category: "", // e.g., "Main Course" (string)
};

// dishReducer controls how the form state changes.
// It receives:
// - state: current form state
// - action: what change we want to make
//
// We use action.type to decide which field to update.
const dishReducer = (state, action) => {
  // Debug: see state transitions in the console
  console.log(state, action);

  // For each field update, action.type equals the field name,
  // and action.payload is the new value.
  if (
    action.type === "name" ||
    action.type === "price" ||
    action.type === "imageUrl" ||
    action.type === "description" ||
    action.type === "type" ||
    action.type === "category"
  ) {
    return {
      // Copy old state (immutability)
      ...state,
      // Computed property name:
      // If action.type is "name", this becomes { name: action.payload }.
      [action.type]: action.payload,
    };
  }

  // RESET sets the form back to initial values.
  else if (action.type === "RESET") {
    return initialState;
  }

  // If action type is unknown, return state unchanged.
  return state;
};

// AddProduct is the page component.
//
// Props:
// - onAdd: a function from the parent (App) that receives the new dish object
const AddProduct = () => {
  const { addNewDishHandler } = useContext(DishContext);
  // useReducer returns:
  // - dish: current state object for the form fields
  // - dispatch: function to send actions to the reducer
  const [dish, dispatch] = useReducer(dishReducer, initialState);

  // Debug: log current dish form state
  console.log(dish);

  // changeHandler runs whenever a user types/selects something in the form.
  const changeHandler = (e) => {
    // e.target is the element that triggered the event (input/select/textarea)
    // name = which field, value = what user typed/selected
    const { name, value } = e.target;

    // Dispatch an action:
    // action.type = name of the field (like "price")
    // action.payload = new value for that field
    dispatch({ type: name, payload: value });
  };

  // resetHandler resets the form fields to initialState.
  const resetHandler = () => {
    dispatch({ type: "RESET" });
  };

  // submitHandler runs when user submits the form.
  const submitHandler = (e) => {
    // Prevent browser from doing a full page reload on form submit.
    e.preventDefault();

    // Create a new dish object. We copy current form state and attach an id.
    // We call onAdd so parent component can add it to the menu list.
    addNewDishHandler({ ...dish, id: uuidv4() });

    // After submission, reset the form.
    resetHandler();
  };

  // JSX UI:
  return (
    // Page background wrapper
    <div className="add-product-container add-product-page">
      {/* Bootstrap container for spacing */}
      <div className="container py-3 py-md-4">
        {/* Center the card horizontally */}
        <div className="row justify-content-center">
          {/* Card width on different screen sizes */}
          <div className="col-lg-8 col-md-10">
            <div className="add-product-card z-card">
              {/* Card header */}
              <div className="card-header-section">
                <h2 className="card-title">
                  {/* FontAwesome icon (shows only if FontAwesome CSS is loaded) */}
                  <i className="fas fa-utensils mr-2"></i>
                  Add New Product
                </h2>
                <p className="card-subtitle">
                  Fill in the details to add a new dish to the menu
                </p>
              </div>

              {/* Card body */}
              <div className="card-body">
                {/* onSubmit will run submitHandler when user clicks submit */}
                <form className="add-product-form" onSubmit={submitHandler}>
                  {/* Row with 2 columns: name + price */}
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="productName" className="form-label">
                        <i className="fas fa-tag mr-2"></i>Product Name
                      </label>

                      {/* Controlled input:
                          - value comes from state (dish.name)
                          - onChange updates state (changeHandler)
                      */}
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="productName"
                        name="name"
                        placeholder="e.g., Butter Chicken"
                        onChange={changeHandler}
                        value={dish.name}
                        required
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="productPrice" className="form-label">
                        <i className="fas fa-rupee-sign mr-2"></i>Price (₹)
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        id="productPrice"
                        name="price"
                        placeholder="e.g., 320"
                        onChange={changeHandler}
                        value={dish.price}
                        min="0"
                        step="1"
                        required
                      />
                    </div>
                  </div>

                  {/* Image URL input */}
                  <div className="form-group">
                    <label htmlFor="productImageUrl" className="form-label">
                      <i className="fas fa-image mr-2"></i>Image URL
                    </label>
                    <input
                      type="url"
                      className="form-control form-control-lg"
                      id="productImageUrl"
                      name="imageUrl"
                      placeholder="https://example.com/image.jpg"
                      onChange={changeHandler}
                      value={dish.imageUrl}
                      required
                    />
                    <small className="form-text text-muted">
                      Enter a valid image URL from the web
                    </small>
                  </div>

                  {/* Description textarea */}
                  <div className="form-group">
                    <label htmlFor="productDescription" className="form-label">
                      <i className="fas fa-align-left mr-2"></i>Description
                    </label>
                    <textarea
                      className="form-control form-control-lg"
                      id="productDescription"
                      name="description"
                      rows="4"
                      placeholder="Describe the dish in detail..."
                      onChange={changeHandler}
                      value={dish.description}
                      required
                    ></textarea>
                  </div>

                  {/* Row with 2 columns: type + category */}
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="productType" className="form-label">
                        <i className="fas fa-leaf mr-2"></i>Type
                      </label>

                      {/* Controlled <select>:
                          - value is dish.type
                          - placeholder option is disabled and has value ""
                          - required ensures user must pick something
                      */}
                      <select
                        className="form-control form-control-lg"
                        id="productType"
                        name="type"
                        onChange={changeHandler}
                        value={dish.type}
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Type
                        </option>
                        <option value="veg">Vegetarian</option>
                        <option value="non-veg">Non-Vegetarian</option>
                      </select>
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="productCategory" className="form-label">
                        <i className="fas fa-list mr-2"></i>Category
                      </label>
                      <select
                        className="form-control form-control-lg"
                        id="productCategory"
                        name="category"
                        onChange={changeHandler}
                        value={dish.category}
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        <option value="Main Course">Main Course</option>
                        <option value="Rice">Rice</option>
                        <option value="South Indian">South Indian</option>
                        <option value="North Indian">North Indian</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Street Food">Street Food</option>
                        <option value="Starters">Starters</option>
                        <option value="Seafood">Seafood</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Dessert">Dessert</option>
                      </select>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="form-actions">
                    {/* Submit triggers form onSubmit */}
                    <button type="submit" className="btn btn-zomato btn-lg">
                      <i className="fas fa-plus-circle mr-2"></i>
                      Add Product
                    </button>

                    {/* Reset:
                        - type="reset" resets native form inputs
                        - onClick also resets reducer state (important for controlled inputs)
                    */}
                    <button
                      type="reset"
                      onClick={resetHandler}
                      className="btn btn-zomato-outline btn-lg"
                    >
                      <i className="fas fa-redo mr-2"></i>
                      Reset Form
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

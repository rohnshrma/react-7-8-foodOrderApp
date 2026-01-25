import React, { useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  name: "",
  price: 0,
  imageUrl: "",
  description: "",
  type: "",
  category: "",
};

const dishReducer = (state, action) => {
  console.log(state, action);
  if (
    action.type === "name" ||
    action.type === "price" ||
    action.type === "imageUrl" ||
    action.type === "description" ||
    action.type === "type" ||
    action.type === "category"
  ) {
    return {
      ...state,
      [action.type]: action.payload,
    };
  } else if (action.type === "RESET") {
    return initialState;
  }

  return state;
};

const AddProduct = ({ onAdd }) => {
  const [dish, dispatch] = useReducer(dishReducer, initialState);
  console.log(dish);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
  };

  const resetHandler = () => {
    dispatch({ type: "RESET" });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    onAdd({ ...dish, id: uuidv4() });
    resetHandler();
  };

  return (
    <div className="add-product-container add-product-page">
      <div className="container py-3 py-md-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="add-product-card z-card">
              <div className="card-header-section">
                <h2 className="card-title">
                  <i className="fas fa-utensils mr-2"></i>
                  Add New Product
                </h2>
                <p className="card-subtitle">
                  Fill in the details to add a new dish to the menu
                </p>
              </div>

              <div className="card-body">
                <form className="add-product-form" onSubmit={submitHandler}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="productName" className="form-label">
                        <i className="fas fa-tag mr-2"></i>Product Name
                      </label>
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

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="productType" className="form-label">
                        <i className="fas fa-leaf mr-2"></i>Type
                      </label>
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

                  <div className="form-actions">
                    <button type="submit" className="btn btn-zomato btn-lg">
                      <i className="fas fa-plus-circle mr-2"></i>
                      Add Product
                    </button>
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

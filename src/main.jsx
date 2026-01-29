// We import StrictMode from React.
// StrictMode is a "development helper" that can warn about unsafe patterns.
// Important: StrictMode does NOT change production behavior, and it does NOT render UI by itself.
import { StrictMode } from "react";

// createRoot is the modern React API for attaching (mounting) a React app to a DOM element.
// React 18+ uses createRoot instead of the older ReactDOM.render.
import { createRoot } from "react-dom/client";

// BrowserRouter enables client-side routing (page navigation without full refresh).
// It listens to the browser URL and renders the correct <Route> in your app.
import { BrowserRouter } from "react-router-dom";

// App is our top-level component (the "root component") that contains the navbar + routes.
import App from "./App.jsx";
import CartProvider from "./context/CartContext.jsx";
import DishProvider from "./context/DishContext.jsx";

// document.getElementById("root") finds the <div id="root"></div> in index.html.
// That is the single DOM node where the entire React app will be rendered.
createRoot(document.getElementById("root")).render(
  // StrictMode wraps your app in development to help catch potential problems early.
  <StrictMode>
    {/* BrowserRouter wraps your app so that <Link>, <Routes>, and <Route> work. */}
    <BrowserRouter>
      <DishProvider>
        <CartProvider>
          {/* App is the component that contains all your pages and navigation. */}
          <App />
        </CartProvider>
      </DishProvider>
    </BrowserRouter>
  </StrictMode>
);

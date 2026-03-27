import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/index.css";
import "./styles/animations.css";
import "./styles/layout.css";
import "./styles/components.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

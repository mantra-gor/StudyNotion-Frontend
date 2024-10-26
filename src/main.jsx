import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducer/index.js";
import { Toaster } from "react-hot-toast";
import { LogoutConfirmationProvider } from "./context/LogoutConfirmationContext.jsx";

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LogoutConfirmationProvider>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </LogoutConfirmationProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

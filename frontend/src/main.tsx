import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes } from "./routes";
import { AuthProvider } from "./providers/auth";
import { DishProvider } from "./providers/dishes";
import { SearchProvider } from "./providers/search";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <DishProvider>
          <Routes />
        </DishProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);

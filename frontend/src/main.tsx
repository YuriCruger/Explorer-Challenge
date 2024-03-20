import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes } from "./routes";
import { AuthProvider } from "./hooks/auth";
import { DishProvider } from "./hooks/dishes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <DishProvider>
        <Routes />
      </DishProvider>
    </AuthProvider>
  </React.StrictMode>
);

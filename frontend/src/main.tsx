import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes } from "./routes";
import { AuthProvider } from "./providers/auth";
import { DishProvider } from "./providers/dishes";
import { SearchProvider } from "./providers/search";
import { OrdersProvider } from "./providers/orders";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <OrdersProvider>
        <DishProvider>
          <SearchProvider>
            <Routes />
            <Toaster richColors />
          </SearchProvider>
        </DishProvider>
      </OrdersProvider>
    </AuthProvider>
  </React.StrictMode>
);

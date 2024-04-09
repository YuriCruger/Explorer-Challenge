import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes } from "./routes";
import { AuthProvider } from "./hooks/auth";
import { DishProvider } from "./hooks/dishes";
import { SearchProvider } from "./hooks/search";
import { CartOrdersProvider } from "./hooks/cartOrders";
import { Toaster } from "sonner";
import { IngredientsProvider } from "./hooks/ingredients";
import { ConfirmModalProvider } from "./hooks/confirmModal";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ConfirmModalProvider>
        <CartOrdersProvider>
          <DishProvider>
            <IngredientsProvider>
              <SearchProvider>
                <Routes />
                <Toaster richColors />
              </SearchProvider>
            </IngredientsProvider>
          </DishProvider>
        </CartOrdersProvider>
      </ConfirmModalProvider>
    </AuthProvider>
  </React.StrictMode>
);

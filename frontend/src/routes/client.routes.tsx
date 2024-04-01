import { NotFound } from "@/pages/NotFound";
import DishPage from "@/pages/DishPage";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router-dom";
import Orders from "@/pages/Orders";

export function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dish/:id" element={<DishPage />} />
      <Route path="/orders" element={<Orders />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

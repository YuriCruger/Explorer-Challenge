import DishPage from "@/pages/DishPage";
import EditDish from "@/pages/EditDish";
import Home from "@/pages/Home";
import NewDish from "@/pages/NewDish";
import { NotFound } from "@/pages/NotFound";
import OrderManagement from "@/pages/OrderManagement";
import { Route, Routes } from "react-router-dom";

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new-dish" element={<NewDish />} />
      <Route path="/edit-dish/:id" element={<EditDish />} />
      <Route path="/dish/:id" element={<DishPage />} />
      <Route path="/order-management" element={<OrderManagement />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

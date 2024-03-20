import DishPage from "@/pages/DishPage";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router-dom";

export function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dish/:id" element={<DishPage />} />
    </Routes>
  );
}

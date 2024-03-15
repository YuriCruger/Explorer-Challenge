import Home from "@/pages/Home";
import NewDish from "@/pages/New Dish";
import { Route, Routes } from "react-router-dom";

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new-dish" element={<NewDish />} />
    </Routes>
  );
}

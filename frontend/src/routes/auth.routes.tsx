import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

import { Routes, Route, Navigate } from "react-router-dom";

import { Login } from "../pages/Login";
import { Signup } from "@/pages/Signup";
import { NotFound } from "@/pages/NotFound";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

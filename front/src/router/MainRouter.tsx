import App from "@/App";
import { AuthProvider } from "@/context/AuthContext";
import Login from "@/pages/auth/login/Login";
import Register from "@/pages/auth/register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";

function MainRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 🔹 Route protégée */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<App />} />
          </Route>

          {/* 🔹 Routes publiques (login, register) */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* 🔹 Redirection par défaut si l’URL est invalide */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default MainRouter;

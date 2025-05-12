import App from "@/App";
import { AuthProvider } from "@/context/AuthContext";
import Login from "@/pages/auth/login/Login";
import Register from "@/pages/auth/register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
import Admin from "@/pages/admin/Admin";
import ProtectAdminRoute from "./utils/ProtectAdminRoute";
import ChatRoomPage from "@/pages/chatRoom/ChatRoomPage.tsx";
import MainLayout from "@/components/MainLayout";
import AccountPage from "@/pages/account/AccountPage";
import { ThemeProvider } from "@/context/ThemeContext";

function MainRouter() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* 🔹 Route protégée */}
            <Route element={<PrivateRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<App />} />
                <Route path="/rooms/:id" element={<ChatRoomPage />} />
                <Route path="/account" element={<AccountPage />} />
                {/* 🔹 Route protégée admin*/}
                <Route element={<ProtectAdminRoute />}>
                  <Route path="/admin" element={<Admin />} />
                </Route>
              </Route>
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
    </ThemeProvider>
  );
}

export default MainRouter;

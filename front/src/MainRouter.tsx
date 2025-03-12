import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import App from "./App";

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;

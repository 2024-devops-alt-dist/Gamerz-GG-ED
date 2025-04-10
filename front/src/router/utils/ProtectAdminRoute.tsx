import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectAdminRoute = () => {
  const authContext = useContext(AuthContext);

  if (authContext === null) return <p>Ereur de contexte ...</p>;
  const { user, loading } = authContext;
  if (loading) return <p>Chargement...</p>;

  return user?.role === "admin" ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default ProtectAdminRoute;

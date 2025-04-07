import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const authContext = useContext(AuthContext);
  console.log(authContext);

  if (authContext === null) return <p>Erreur contexte ...</p>;
  const { user, loading } = authContext;

  if (loading) {
    return <p>Chargement...</p>; // Attendre avant de rediriger
  }

  return user && user.role !== "admin" ? (
    <Navigate to="/" replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;

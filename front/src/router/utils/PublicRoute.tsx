import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) return <p>Erreur contexte ...</p>;
  const { user, loading } = authContext;

  if (loading) {
    return <p>Chargement...</p>; // Attendre avant de rediriger
  }
  const test = user === null ? "user" : "not";
  console.log(test);

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;

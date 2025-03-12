import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) return <p>Ereur de contexte ...</p>;
  const { user, loading } = authContext;
  console.log(user);
  if (loading) return <p>Chargement...</p>;

  return user ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default PrivateRoute;

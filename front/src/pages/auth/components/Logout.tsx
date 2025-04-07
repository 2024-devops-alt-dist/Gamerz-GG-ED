import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/authService";

const Logout = () => {
  const [authService] = useState(new AuthService());
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    return <p>Erreur de contexte</p>;
  }
  const { user, setUser } = authContext;

  async function logoutUser() {
    if (!user || !setUser) return;

    try {
      const resp = await authService.logout(user);

      if (resp.status === 200) {
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  }

  return (
    <Button variant={"ghost"} onClick={logoutUser}>
      Déconnexion
    </Button>
  );
};

export default Logout;

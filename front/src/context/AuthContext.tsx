import userI from "@/interfaces/userI";
import AuthService from "@/services/authService";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: userI | null;
  setUser: (user: userI | null) => void;
  loading: boolean;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<userI | null>(null);
  const [loading, setLoading] = useState(true);
  const [authService] = useState(new AuthService());

  async function fetchUserConnect() {
    try {
      const resp = await authService.getUserConnect();
      if (resp?.message === "Accès non autorisé") {
        setUser(null);
      } else {
        setUser(resp);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUserConnect();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

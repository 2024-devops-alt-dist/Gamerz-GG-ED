import authService from "@/services/authService";
import { createContext, ReactNode, useEffect, useState } from "react";

const AuthContext = createContext({});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState();
  const [authS] = useState(new authService());

  async function fetchUserConnect() {
    const resp = await authS.getUserConnect();
    console.log(resp);
  }
  useEffect(() => {
    fetchUserConnect();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

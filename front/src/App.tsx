import { useState } from "react";
import "./App.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import AuthService from "./services/AuthService.ts";
function App() {
  const [authService] = useState(new AuthService());

  function getAllUsers() {
    try {
      const resp = authService.getAllUser();
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }
  getAllUsers();
  return (
    <>
      <AuthProvider>
        <h1>Gamerz-GG-ED</h1>
      </AuthProvider>
    </>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import Logout from "./pages/auth/components/Logout.tsx";
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
      <h1>Gamerz-GG-ED</h1>
      <Logout />
    </>
  );
}

export default App;

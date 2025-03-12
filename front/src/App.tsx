import { useState } from "react";
import "./App.css";
import authService from "./services/authService";
import { AuthProvider } from "./context/AuthContext.tsx";
function App() {
  const [service] = useState(new authService());
  function getAllUsers() {
    try {
      const resp = service.getAllUser();
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

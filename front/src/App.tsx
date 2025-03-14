import { useState } from "react";
import "./App.css";
import HomePage from "@/pages/home/Home.tsx";
import AuthService from "@/services/authService.ts";
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
      <HomePage></HomePage>
  );
}

export default App;

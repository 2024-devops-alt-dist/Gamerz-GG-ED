import userI from "@/interfaces/userI";
import axios from "axios";

class AuthService {
  private API_URL = `${import.meta.env.VITE_API_URL}`;
  async register(data: userI) {
    const resp = await axios.post(`${this.API_URL}register`, data, {
      withCredentials: true,
    });
    return resp;
  }
  async login(data: userI) {
    const resp = await axios.post(`${this.API_URL}login`, data, {
      withCredentials: true,
    });
    return resp;
  }

  async getAllUser() {
    const resp = await axios.get(`${this.API_URL}admin/users`, {
      withCredentials: true,
    });
    return resp.data;
  }

  async getUserConnect() {
    const resp = await axios.get(`${this.API_URL}me`, {
      withCredentials: true,
    });
    return resp.data;
  }
}
export default AuthService;

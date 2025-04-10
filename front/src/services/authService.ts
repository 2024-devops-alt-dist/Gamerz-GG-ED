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
  async logout(data: userI) {
    const resp = await axios.post(`${this.API_URL}logout`, data, {
      withCredentials: true,
    });
    return resp;
  }

  async getUserConnect() {
    const resp = await axios.get(`${this.API_URL}me`, {
      withCredentials: true,
    });
    return resp.data;
  }

  async updateProfile(data: { username?: string; email?: string }) {
    const resp = await axios.put(`${this.API_URL}update-profile`, data, {
      withCredentials: true,
    });
    return resp.data;
  }

  async changePassword(data: { oldPassword: string; newPassword: string }) {
    const resp = await axios.put(`${this.API_URL}change-password`, data, {
      withCredentials: true,
    });
    return resp.data;
  }
}
export default AuthService;

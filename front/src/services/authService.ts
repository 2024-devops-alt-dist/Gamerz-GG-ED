import userI from "@/interfaces/userI";
import axios from "axios";

class authService {
  private API_URL = `${import.meta.env.VITE_API_URL}register`;
  async register(data: userI) {
    const resp = await axios.post(this.API_URL, data);
    return resp;
  }
}
export default authService;

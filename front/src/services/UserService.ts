import userI from "@/interfaces/userI";
import axios from "axios";

class UserService {
  private API_URL = `${import.meta.env.VITE_API_URL}`;

  async getAll(): Promise<userI[] | null> {
    const resp = await axios.get(`${this.API_URL}admin/users`, {
      withCredentials: true,
    });
    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  }

  async getByStatusPending(): Promise<userI[] | null> {
    const resp = await axios.get(`${this.API_URL}admin/users/pending`, {
      withCredentials: true,
    });
    if (resp.status === 200) {
      return resp.data;
    }
    if (resp.status === 404) throw new Error(resp.data.message);
    else {
      return null;
    }
  }
}

export default UserService;

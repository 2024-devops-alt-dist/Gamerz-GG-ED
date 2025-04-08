import axios from "axios";

class AdminService {
  private API_URL = `${import.meta.env.VITE_API_URL}admin/`;

  async validate(ids: string[]) {
    const resp = await axios.put(
      `${this.API_URL}validate`,
      { ids },
      { withCredentials: true }
    );
    return resp;
  }
}

export default AdminService;

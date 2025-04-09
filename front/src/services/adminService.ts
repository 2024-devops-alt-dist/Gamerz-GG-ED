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

  async banned(ids: string[]) {
    const resp = await axios.put(
      `${this.API_URL}ban`,
      { ids },
      { withCredentials: true }
    );
    return resp;
  }

  async deleteByIds(ids: string[]) {
    const resp = await axios.delete(`${this.API_URL}delete`, {
      data: { ids },
      withCredentials: true,
    });
    return resp;
  }
}

export default AdminService;

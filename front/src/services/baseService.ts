import axios from "axios";

class BaseService<T> {
  private API_URL: string;

  constructor(private pathUrl: string) {
    this.API_URL = `${import.meta.env.VITE_API_URL}${this.pathUrl}`;
  }

  async create(data: T) {
    const resp = await axios.post(`${this.API_URL}`, data, {
      withCredentials: true,
    });
    return resp;
  }

  async getAll() {
    const resp = await axios.get(`${this.API_URL}`, {
      withCredentials: true,
    });
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
export default BaseService;

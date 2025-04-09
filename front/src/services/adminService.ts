import axios from "axios";
import BaseService from "./baseService";
import userI from "@/interfaces/userI";

class AdminService extends BaseService<userI> {
  constructor() {
    super("admin/");
  }
  private API = `${import.meta.env.VITE_API_URL}admin/`;

  async validate(ids: string[]) {
    const resp = await axios.put(
      `${this.API}validate`,
      { ids },
      { withCredentials: true }
    );
    return resp;
  }

  async banned(ids: string[]) {
    const resp = await axios.put(
      `${this.API}ban`,
      { ids },
      { withCredentials: true }
    );
    return resp;
  }
}

export default AdminService;

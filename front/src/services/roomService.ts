
import IRoom from "@/interfaces/IRoom";
import BaseService from "./baseService";
import axios from "axios";
class RoomService extends BaseService<IRoom> {
  constructor() {
    super("rooms/");
  }

    private API = `${import.meta.env.VITE_API_URL}rooms`;



    async getById(roomId: string): Promise<roomI | null> {
        const resp = await axios.get(`${this.API_URL}/${roomId}`, {
            withCredentials: true,
        });

        if (resp.status === 200) {
            return resp.data;
        } else if (resp.status === 404) {
            throw new Error(resp.data.message);
        } else {
            return null;
        }
    }

    async joinRoom(roomId: string): Promise<{ message: string }> {
        const resp = await axios.post(`${this.API_URL}/${roomId}/join`, {}, {
            withCredentials: true,
        });

        return resp.data;
    }

    async leaveRoom(roomId: string): Promise<{ message: string }> {
        const resp = await axios.post(`${this.API_URL}/${roomId}/leave`, {}, {
            withCredentials: true,
        });

        return resp.data;
    }

}

export default RoomService;

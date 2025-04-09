import axios from "axios";
import roomI from "@/interfaces/roomI";

class RoomService {
    private API_URL = `${import.meta.env.VITE_API_URL}rooms`;

    async getAll(): Promise<roomI[] | null> {
        const resp = await axios.get(this.API_URL, {
            withCredentials: true,
        });

        if (resp.status === 200) {
            return resp.data;
        } else {
            return null;
        }
    }

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

    async deleteRoom(roomId: string): Promise<{ message: string }> {
        const resp = await axios.delete(`${this.API_URL}/${roomId}`, {
            withCredentials: true,
        });

        return resp.data;
    }

    async create(game: string): Promise<roomI> {
        const resp = await axios.post(this.API_URL, { game }, {
            withCredentials: true,
        });

        return resp.data;
    }
}

export default RoomService;

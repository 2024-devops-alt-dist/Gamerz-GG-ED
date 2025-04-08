import axios from "axios";
import messageI from "@/interfaces/messageI";

class MessageService {
    private API_URL = `${import.meta.env.VITE_API_URL}messages`;

    async getMessages(roomId: string): Promise<messageI[]> {
        const res = await axios.get(`${this.API_URL}/${roomId}/messages`, {
            withCredentials: true,
        });

        return res.data;
    }
}

export default MessageService;

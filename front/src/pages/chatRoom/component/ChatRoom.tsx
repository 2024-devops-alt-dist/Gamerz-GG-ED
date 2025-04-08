import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import MessageService from "@/services/messageService";
import RoomService from "@/services/roomService";
import messageI from "@/interfaces/messageI";
import roomI from "@/interfaces/roomI";
import { useAuth } from "@/context/AuthContext";

interface ChatRoomProps {
    roomId: string;
}

const socket: Socket = io("http://localhost:5000", {
    withCredentials: true,
});

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId }) => {
    const { user, loading: authLoading } = useAuth();
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<messageI[]>([]);
    const [room, setRoom] = useState<roomI | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const bottomRef = useRef<HTMLDivElement>(null);

    const userId = user?._id;

    useEffect(() => {
        if (!roomId || !userId) return;

        socket.emit("joinRoom", { roomId, userId });

        const fetchData = async () => {
            setLoading(true);
            try {
                const messageService = new MessageService();
                const roomService = new RoomService();

                const [history, roomData] = await Promise.all([
                    messageService.getMessages(roomId),
                    roomService.getById(roomId),
                ]);

                setMessages(history);
                setRoom(roomData);
            } catch (error) {
                console.error("❌ Erreur chargement :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        socket.on("newMessage", (msg: messageI) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("newMessage");
        };
    }, [roomId, userId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (authLoading || loading) {
        return <div className="text-white">🔄 Chargement du salon...</div>;
    }

    if (!userId) {
        return <div className="text-white">🔐 Vous devez être connecté</div>;
    }

    if (!room) {
        return <div className="text-white">❌ Salon introuvable</div>;
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] gap-2">
            <h2 className="text-xl font-semibold text-white px-4 pt-2">
                Salon : {room.game}
            </h2>

            <div className="flex flex-col gap-2 bg-gray-800 rounded mx-4 p-4 flex-grow overflow-y-auto">
                {messages.map((msg) => {
                    const isMe = (() => {
                        if (!msg.senderId || typeof msg.senderId === "string") return false;
                        return msg.senderId._id === userId;
                    })();

                    const username = (() => {
                        if (!msg.senderId || typeof msg.senderId === "string") return "Inconnu";
                        return msg.senderId.username;
                    })();

                    return (
                        <div
                            key={msg._id}
                            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[70%] p-3 rounded-xl ${
                                    isMe
                                        ? "bg-blue-600 text-white text-right"
                                        : "bg-gray-700 text-gray-100"
                                }`}
                            >
                                <div className="text-xs text-gray-300 mb-1">
                                    {isMe ? "Moi" : username}
                                </div>
                                <div className="font-medium break-words">{msg.content}</div>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            <div className="flex gap-2 px-4 pb-4">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ton message..."
                    className="flex-1 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
                />
                <button
                    onClick={handleSend}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                    Envoyer
                </button>
            </div>
        </div>
    );

    function handleSend() {
        if (!message.trim() || !userId) return;

        socket.emit("sendMessage", {
            roomId,
            userId,
            content: message,
        });

        setMessage("");
    }
};

export default ChatRoom;

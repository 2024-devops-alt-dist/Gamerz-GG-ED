import { MessageCircle, SendHorizonal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import MessageService from "@/services/messageService";
import RoomService from "@/services/roomService";
import messageI from "@/interfaces/messageI";
import roomI from "@/interfaces/roomI";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import JoinRoom from "./JoinRoom";

interface ChatRoomProps {
  roomId: string;
}

const socketUrl = import.meta.env.VITE_SOCKET_URL;

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId }) => {
  const { user, loading: authLoading } = useAuth();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<messageI[]>([]);
  const [room, setRoom] = useState<roomI | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [socketError, setSocketError] = useState<boolean>(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>();
  const bottomRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const userId = user?._id;

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    try {
      const socket = io(socketUrl, {
        withCredentials: true,
        timeout: 3000,
        reconnectionAttempts: 3,
      });

      socket.on("connect_error", () => {
        setSocketError(true);
        socket.disconnect();
      });

      socketRef.current = socket;
    } catch {
      setSocketError(true);
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!roomId || !userId || socketError || !socketRef.current) return;

    const socket = socketRef.current;
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
      } catch {
        console.log("error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    socket.on("newMessage", (msg: messageI) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("userTyping", ({ username }) => {
      if (username !== user?.username) {
        setTypingUser(username);
        setTimeout(() => {
          setTypingUser(null);
        }, 3000);
      }
    });

    return () => {
      socket.off("newMessage");
      socket.off("userTyping");
    };
  }, [roomId, userId, socketError]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (socketError) {
    return (
      <div className="text-red-500 p-6">
        ❌ Impossible de se connecter au serveur de chat.
      </div>
    );
  }

  if (authLoading || loading) {
    return <div className="text-forgeten p-6">🔄 Chargement du salon...</div>;
  }

  if (!userId) {
    return <div className="text-forgeten p-6">🔐 Vous devez être connecté</div>;
  }

  if (!room) {
    return <div className="text-forgeten p-6">❌ Salon introuvable</div>;
  }

  function handleSend() {
    if (!message.trim() || !userId || socketError || !socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      roomId,
      userId,
      content: message,
    });

    setMessage("");
  }

  return (
    <div className="flex flex-col h-full">
      {!isOpen ? (
        <div className="flex flex-col justify-between h-full">
          {/* Header */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-700">
            <MessageCircle className="text-foreground w-6 h-6" />
            <h2 className="text-xl font-semibold tracking-wide">{room.game}</h2>
            <span className="ml-auto text-sm text-gray-500">Salon actif</span>
            <Button onClick={handleIsOpen}>Inviter des amis</Button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {messages.map((msg) => {
              const isMe =
                msg.senderId &&
                typeof msg.senderId !== "string" &&
                msg.senderId._id === userId;

              const username =
                msg.senderId && typeof msg.senderId !== "string"
                  ? msg.senderId.username
                  : "Inconnu";

              const timestamp = msg.timestamp
                ? new Date(msg.timestamp).toLocaleString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "";

              return (
                <div
                  key={msg._id}
                  className={`flex ${
                    isMe ? "justify-end" : "justify-start"
                  } fade-in-up`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-xl shadow-md transition-all duration-200 ${
                      isMe ? "bg-[#52525B] " : "bg-[#2D2D2D] text-gray-200"
                    }`}
                  >
                    <div className="text-xs text-gray-300 mb-1 font-semibold">
                      {isMe ? "Moi" : username}
                    </div>
                    <div className="whitespace-pre-wrap break-words text-sm">
                      {msg.content}
                    </div>
                    <div className="text-xs text-gray-300 mt-2 text-right italic">
                      {timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {typingUser && (
              <div className="text-sm text-foreground italic px-2">
                {typingUser} est en train d’écrire...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="border-t ">
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (socketRef.current && user?.username) {
                    socketRef.current.emit("typing", {
                      roomId,
                      username: user.username,
                    });
                  }
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ton message..."
                className="flex-1 px-4 py-2 rounded-xl bg-[#1e1e1e]  placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              />
              <button
                onClick={handleSend}
                className="p-4 rounded-full bg-[#1f2532] hover:bg-[#2a3245] transition flex items-center justify-center border border-gray-700"
              >
                <SendHorizonal className="w-5 h-5 " />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <JoinRoom />
      )}
    </div>
  );
};

export default ChatRoom;

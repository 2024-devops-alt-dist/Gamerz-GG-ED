import { useParams } from "react-router-dom";

import ChatRoom from "@/pages/chatRoom/component/ChatRoom";
import { useAuth } from "@/context/AuthContext";

export default function ChatRoomPage() {
  const { id: roomId } = useParams();
  const { user, loading } = useAuth();

  return (
    <div className="p-6 bg-background dark:bg-background-dark min-h-screen text-foreground">
      {loading && <div>Chargement utilisateur...</div>}
      {!loading && !user && <div>Vous devez être connecté</div>}
      {!loading && user && !roomId && <div>Salon introuvable</div>}
      {!loading && user && roomId && (
        <ChatRoom key={`${roomId}-${user._id}`} roomId={roomId} />
      )}
    </div>
  );
}

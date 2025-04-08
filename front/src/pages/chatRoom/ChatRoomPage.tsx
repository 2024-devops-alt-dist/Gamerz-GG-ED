import { useParams } from "react-router-dom";
import { AppSidebar } from "@/pages/home/component/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ChatRoom from "@/pages/chatRoom/component/ChatRoom";
import { useAuth } from "@/context/AuthContext";

export default function ChatRoomPage() {
    const { id: roomId } = useParams();
    const { user, loading } = useAuth();

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="p-6 bg-[#23272A] min-h-screen text-white">
                    {loading && <div>Chargement utilisateur...</div>}
                    {!loading && !user && <div>Vous devez être connecté</div>}
                    {!loading && user && !roomId && <div>Salon introuvable</div>}
                    {!loading && user && roomId && (
                        <ChatRoom key={`${roomId}-${user._id}`} roomId={roomId} />
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

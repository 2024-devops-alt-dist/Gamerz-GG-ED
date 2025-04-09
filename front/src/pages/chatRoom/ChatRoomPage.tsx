import {useParams} from "react-router-dom";
import {AppSidebar} from "@/pages/home/component/AppSidebar";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import ChatRoom from "@/pages/chatRoom/component/ChatRoom";
import {useAuth} from "@/context/AuthContext";
import {Separator} from "@/components/ui/separator.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";

export default function ChatRoomPage() {
    const {id: roomId} = useParams();
    const {user, loading} = useAuth();

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear bg-[#2C2F33] text-white shadow-md px-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator orientation="vertical" className="mr-2 h-4 border-gray-500"/>
                        <Breadcrumb>
                            <BreadcrumbList className="flex items-center gap-2">
                                <BreadcrumbSeparator className="hidden md:block text-gray-400"/>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/"
                                                    className="text-white font-semibold px-3 py-1 rounded-md hover:bg-gray-700 transition-all">
                                        Accueil
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="p-6 bg-[#23272A] min-h-screen text-white">
                    {loading && <div>Chargement utilisateur...</div>}
                    {!loading && !user && <div>Vous devez être connecté</div>}
                    {!loading && user && !roomId && <div>Salon introuvable</div>}
                    {!loading && user && roomId && (
                        <ChatRoom key={`${roomId}-${user._id}`} roomId={roomId}/>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

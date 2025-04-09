"use client";

import {Gamepad2} from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import {useEffect, useState} from "react";
import roomI from "@/interfaces/roomI";
import RoomService from "@/services/roomService.ts";
import {useNavigate} from "react-router-dom";

export function NavMain() {
    const [rooms, setRooms] = useState<roomI[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const service = new RoomService();
                const result = await service.getAll();
                if (result) setRooms(result);
            } catch (err) {
                console.error("Erreur chargement des rooms", err);
            }
        };

        fetchRooms();
    }, []);

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Salons</SidebarGroupLabel>
            <SidebarMenu>
                {rooms.map((room) => (
                    <SidebarMenuItem key={room._id}>
                        <SidebarMenuButton
                            tooltip={room.game}
                            onClick={() => navigate(`/rooms/${room._id}`)}
                            className="flex items-center cursor-pointer">
                            <Gamepad2 className="mr-2 h-4 w-4"/>
                            <span className="leading-none">{room.game}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

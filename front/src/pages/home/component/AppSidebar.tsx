"use client";

import React, {useEffect, useState} from "react";
import {NavUser} from "./NavUser.tsx";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar.tsx";
import {NavMain} from "@/pages/home/component/NavMain.tsx";
import roomI from "@/interfaces/roomI";
import RoomService from "@/services/roomService.ts";
import {useNavigate} from "react-router-dom";

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    const [rooms, setRooms] = useState<roomI[]>([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const service = new RoomService();
                const result = await service.getAll();
                if (result) {
                    setRooms(result);
                }
            } catch (err) {
                console.error("Erreur chargement des rooms", err);
            }
        };

        fetchRooms();
    }, []);

    const navigate = useNavigate();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader/>
            <SidebarContent>
                <NavMain/>
                <div className="mt-4 px-2">
                    <h3 className="text-xs uppercase text-gray-400 mb-2">Salons</h3>
                    <ul className="space-y-1">
                        {rooms.map((room) => (
                            <li
                                key={room._id}
                                className="cursor-pointer px-3 py-2 rounded hover:bg-gray-700 transition-all text-sm"
                                onClick={() => navigate(`/rooms/${room._id}`)}>
                                🎮 {room.game}
                            </li>
                        ))}
                    </ul>

                </div>
            </SidebarContent>
            <SidebarFooter>
                <NavUser/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    );
}

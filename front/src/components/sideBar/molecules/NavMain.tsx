"use client";

import { Gamepad2 } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { useContext, useEffect, useState } from "react";
import RoomService from "@/services/roomService.ts";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import IRoom from "@/interfaces/IRoom";

export function NavMain() {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [roomService] = useState(new RoomService());
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const fetchRooms = async () => {
    try {
      const userId = authContext?.user?._id;
      const result = await roomService.getByUserId(userId);
      console.log(result);

      setRooms(result);
    } catch (err) {
      console.error("Erreur chargement des rooms", err);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Salons</SidebarGroupLabel>
      <SidebarMenu>
        {rooms.map((room) => {
          console.log(room);

          return (
            <SidebarMenuItem key={room._id}>
              <SidebarMenuButton
                tooltip={room.game}
                onClick={() => navigate(`/rooms/${room._id}`)}
                className="flex items-center cursor-pointer"
              >
                <Gamepad2 className="mr-2 h-4 w-4" />
                <span className="leading-none">{room.game}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

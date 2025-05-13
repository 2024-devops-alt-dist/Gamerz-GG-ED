"use client";

import { Gamepad2 } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { useNavigate } from "react-router-dom";
import { useRoomContext } from "@/context/RoomContext";

export function NavMain() {
  const { rooms } = useRoomContext();
  const navigate = useNavigate();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Salons</SidebarGroupLabel>
      <SidebarMenu>
        {rooms.map((room) => (
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
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

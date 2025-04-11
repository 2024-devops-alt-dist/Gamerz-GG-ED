"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar.tsx";
import { NavMain } from "@/components/sideBar/molecules/NavMain";
import { Button } from "@/components/ui/button.tsx";
import { NavUser } from "./molecules/NavUser";
import { Gamepad2 } from "lucide-react";

interface AppSidebarProps {
  setIsOpen?: (isOpen: boolean) => void;
  isOpen?: boolean;
}
export function AppSidebar({ setIsOpen, isOpen }: AppSidebarProps) {
  const handleIsOpen = () => {
    setIsOpen?.(!isOpen);
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <Gamepad2 className="mr-2 h-4 w-4" />
        <Button onClick={handleIsOpen}>Rejoindre un Salon</Button>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

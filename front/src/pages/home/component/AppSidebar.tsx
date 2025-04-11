"use client";

import { NavUser } from "./NavUser.tsx";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar.tsx";
import { NavMain } from "@/pages/home/component/NavMain.tsx";
import { Button } from "@/components/ui/button.tsx";

interface AppSidebarProps {
  setIsOpen?: (isOpen: boolean) => void;
  isOpen?: boolean;
}
export function AppSidebar({ setIsOpen, isOpen }: AppSidebarProps) {
  const handleIsOpen = () => {
    if (setIsOpen) setIsOpen(!isOpen);
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleIsOpen}>Rejoindre un Salon</Button>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

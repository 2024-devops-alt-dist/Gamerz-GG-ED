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

interface AppSidebarProps {
  setIsOpen?: (isOpen: boolean) => void;
  isOpen?: boolean;
}
export function AppSidebar({ setIsOpen, isOpen }: AppSidebarProps) {
  const handleIsOpen = () => {
    console.log(isOpen);
    setIsOpen?.(!isOpen);
    console.log(isOpen);
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

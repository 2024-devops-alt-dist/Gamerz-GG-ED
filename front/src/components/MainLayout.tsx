import ListRooms from "@/components/listRooms/ListRooms";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "@/components/sideBar/AppSidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <SidebarProvider>
        <AppSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 min-h-[100vh] rounded-xl bg-muted/50 md:min-h-min">
            {!isOpen ? <Outlet /> : <ListRooms variant="" />}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default MainLayout;

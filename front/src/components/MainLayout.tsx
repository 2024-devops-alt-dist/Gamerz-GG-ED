import ListRooms from "@/components/listRooms/ListRooms";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "@/components/sideBar/AppSidebar";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import AppSidebarAdmin from "./sideBar/AppSidebarAdmin";

function MainLayout() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div>
      <SidebarProvider>
        {isAdminPage ? (
          <AppSidebarAdmin onSelectComponent={() => {}} />
        ) : (
          <AppSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator
                orientation="vertical"
                className="mr-2 h-4 border-gray-500"
              />
              <Breadcrumb>
                <BreadcrumbList className="flex items-center gap-2">
                  <BreadcrumbSeparator className="hidden md:block text-gray-400" />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/"
                      className="font-semibold px-3 py-1 rounded-md  transition-all"
                    >
                      Accueil
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 min-h-[100vh] rounded-xl bg-muted/50 md:min-h-min">
            {!isOpen ? <Outlet /> : <ListRooms variant="" />}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default MainLayout;

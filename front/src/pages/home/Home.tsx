import { AppSidebar } from "./component/AppSidebar.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar.tsx";
import { useState } from "react";
import ListRooms from "../admin/components/listRooms/ListRooms.tsx";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <SidebarProvider>
      <AppSidebar setIsOpen={setIsOpen} isOpen={isOpen} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear bg-[#2C2F33] text-white shadow-md px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
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
                    className="text-white font-semibold px-3 py-1 rounded-md hover:bg-gray-700 transition-all"
                  >
                    Accueil
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 bg-[#23272A] min-h-screen text-white">
          <div className="flex-1 rounded-xl bg-gray-700 p-6 flex items-center justify-center text-gray-300">
            {!isOpen ? (
              <h1>🏠 Bienvenue sur votre Dashboard !</h1>
            ) : (
              <>
                <div className="flex flex-col w-full">
                  <h2 className="m-auto">Rejoindre un Salon</h2>
                  <ListRooms />
                </div>
              </>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

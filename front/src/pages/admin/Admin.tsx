import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactElement, useState } from "react";
import AppSidebar from "./components/app-sidebar";

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState<ReactElement | null>(
    null
  );
  return (
    <SidebarProvider>
      <AppSidebar onSelectComponent={setActiveComponent} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 min-h-[100vh] rounded-xl bg-muted/50 md:min-h-min">
          {activeComponent ? (
            activeComponent
          ) : (
            <p>Sélectionnez un élément du menu</p>
          )}
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Admin;

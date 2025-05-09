import AppSidebarAdmin from "@/components/sideBar/AppSidebarAdmin";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactElement, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState<ReactElement | null>(
    null
  );

  const [isFading, setIsFading] = useState(false);
  const navigate = useNavigate();

  const handleGoHome = () => {
    setIsFading(true);
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  return (
    <SidebarProvider>
      <AppSidebarAdmin onSelectComponent={setActiveComponent} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <Button
            onClick={handleGoHome}
            variant="outline"
            className="text-sm transition-all duration-200 hover:scale-[1.02] hover:bg-primary/10"
          >
            Accueil
          </Button>
        </header>
        <div
          className={`flex flex-1 flex-col gap-4 p-4 min-h-[100vh] rounded-xl bg-muted/50 md:min-h-min transition-opacity duration-300 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
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

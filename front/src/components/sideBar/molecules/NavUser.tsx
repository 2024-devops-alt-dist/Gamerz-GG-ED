import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BadgeCheck, ChevronsUpDown, LogOut, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import AuthContext from "@/context/AuthContext";
import Logout from "@/pages/auth/components/Logout.tsx";

export function NavUser() {
  const { isMobile } = useSidebar();
  const authContext = useContext(AuthContext);
  const [isFading, setIsFading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    setIsFading(false);
  }, [location]);

  if (!authContext) {
    return <p>Erreur de contexte</p>;
  }

  const { user } = authContext;
  const userUsername = user?.username || "Utilisateur";
  const userEmail = user?.email || "Aucune email";
  const userInitial = userUsername.charAt(0).toUpperCase();

  const handleFadeAndNavigate = (path: string) => {
    setIsFading(true);
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{userUsername}</span>
                <span className="truncate text-xs">{userEmail}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={`w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg transition-opacity duration-300 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{userUsername}</span>
                  <span className="truncate text-xs">{userEmail}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => handleFadeAndNavigate("/account")}
                className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-md px-3 py-2 cursor-pointer w-full"
              >
                <BadgeCheck />
                Mon compte
              </DropdownMenuItem>
              {user?.role === "admin" && (
                <DropdownMenuItem
                  onClick={() => handleFadeAndNavigate("/admin")}
                  className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-md px-3 py-2 cursor-pointer w-full"
                >
                  <ShieldCheck />
                  Admin Dashboard
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

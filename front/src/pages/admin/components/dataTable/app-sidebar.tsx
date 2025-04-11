import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import ListUser from "../listUser/ListUser";
import { NavUser } from "@/pages/home/component/NavUser.tsx";
import ListRooms from "../listRooms/ListRooms";

const data = {
  navMain: [
    {
      title: "Gestion des utilisateurs",
      items: [
        {
          title: "Liste de tous les utilisateurs",
          component: () => <ListUser type={"all"} key="all" />,
          isActive: true,
        },
        {
          title: "En attente d'aprobation",
          component: () => <ListUser type={"pending"} key="pending" />,
        },
        {
          title: "Liste des salons",
          component: () => <ListRooms />,
        },
      ],
    },
  ],
};

interface AppSidebarProps {
  onSelectComponent: (component: () => React.ReactElement) => void;
}

const AppSidebar = ({ onSelectComponent, ...props }: AppSidebarProps) => {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/admin">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Gamerz Admin</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((section) => (
              <SidebarMenuItem key={section.title}>
                <SidebarMenuButton asChild>
                  <div className="font-medium">{section.title}</div>
                </SidebarMenuButton>
                {section.items?.length ? (
                  <SidebarMenuSub>
                    {section.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={item.isActive}
                          onClick={() => {
                            return (
                              item.component &&
                              onSelectComponent(item.component)
                            );
                          }}
                        >
                          <div className="cursor-pointer">{item.title}</div>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
export default AppSidebar;

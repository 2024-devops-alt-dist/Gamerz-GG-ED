import * as React from "react";
import {GalleryVerticalEnd} from "lucide-react";
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
import ListUser from "./listUser/ListUser";
import ListUserPending from "./listUser/ListUserPending";
import {NavUser} from "@/pages/home/component/NavUser.tsx";

const data = {
  navMain: [
    {
      title: "Gestion des utilisateurs",
      items: [
        {
          title: "Liste de tous les utilisateurs",
          component: <ListUser />,
          isActive: true,
        },
        {
          title: "En attente d'aprobation",
          component: <ListUserPending />,
        },
      ],
    },
  ],
};

interface AppSidebarProps {
  onSelectComponent: (component: React.ReactElement) => void;
}

const AppSidebar = ({ onSelectComponent, ...props }: AppSidebarProps) => {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Documentation</span>
                  <span className="">v1.0.0</span>
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
                          onClick={() =>
                            item.component && onSelectComponent(item.component)
                          }
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
        <NavUser/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
export default AppSidebar;

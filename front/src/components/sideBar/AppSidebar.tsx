"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar.tsx";
import {NavMain} from "@/components/sideBar/molecules/NavMain";
import {NavUser} from "./molecules/NavUser";
import {MessageCirclePlus} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip";

export function AppSidebar() {
    const {state} = useSidebar();
    const isCollapsed = state === "collapsed";

    const joinRoom = () => {
        console.log("Rejoindre un Salon");
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader/>
            <SidebarContent>
                <NavMain/>
            </SidebarContent>
            <SidebarFooter className="flex flex-col items-center gap-4 p-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={joinRoom}
                                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors cursor-pointer w-full"
                            >
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                                    <MessageCirclePlus className="w-4 h-4"/>
                                </div>
                                {!isCollapsed && (
                                    <span className="whitespace-nowrap">Rejoindre un Salon</span>
                                )}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Rejoindre un Salon</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <NavUser/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    );
}

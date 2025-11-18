import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { FaChartPie, FaUserPlus, FaUsers } from "react-icons/fa";
import { MdOutlineDesignServices } from "react-icons/md";
import { PiPipeLight } from "react-icons/pi";
import { BiSolidContact } from "react-icons/bi";
import { FaBuildingUser } from "react-icons/fa6";
import { TbAdjustmentsCog, TbAdjustmentsHorizontal   } from "react-icons/tb";



// This is sample data.
const data = {
  navMain: [
    {
      id: 'overview',
      title: "Overview",
      url: "/dashboard",
      icon: FaChartPie,
    },
    {
      id: 'team',
      title: "Team",
      url: "/dashboard/team",
      icon: FaUsers,
    },
    {
      id: 'services',
      title: "Services",
      url: "/dashboard/services",
      icon: TbAdjustmentsHorizontal ,
    },
    {
      id: 'projects',
      title: "Projects",
      url: "/dashboard/projects",
      icon: PiPipeLight,
    },
    {
      id: 'contacts',
      title: "Contacts",
      url: "/dashboard/contacts",
      icon: BiSolidContact,
    },
    {
      id: 'job-postings',
      title: "Job Postings",
      url: "/dashboard/job-postings",
      icon: FaUserPlus,
    },
    {
      id: 'applications',
      title: "Applications",
      url: "/dashboard/applications",
      icon: FaBuildingUser,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" className="transition-all duration-300 ease-in-out" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <TbAdjustmentsCog   className="size-6" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="poppins-black">Pipecraft Designs</span>
                  <span className="font-medium">Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

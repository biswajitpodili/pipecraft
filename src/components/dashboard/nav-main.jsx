
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function NavMain({ items }) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setActiveTab(window.location.pathname.split("/").pop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = activeTab === item.url.split("/").pop();
          return (
            <DropdownMenu key={item.title}>
              <SidebarMenuItem>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    className={`poppins font-semibold cursor-pointer ${isActive ? 'text-black! poppins-semibold' : ''}`}
                    tooltip={item.title}
                    isActive={isActive}
                    onClick={() => {
                      navigate(item.url);
                    }}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
              </SidebarMenuItem>
            </DropdownMenu>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

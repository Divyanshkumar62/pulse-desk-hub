import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { toggleSidebar } from "../features/ui/uiSlice";
import { Button } from "./ui/button";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Settings,
  Menu,
  BarChart3,
  Calendar,
  MessageSquare,
} from "lucide-react";

interface SidebarProps {
  mobileOverlay?: boolean;
}

const Sidebar = ({ mobileOverlay = false }: SidebarProps) => {
  const dispatch = useDispatch();
  const { sidebarCollapsed } = useSelector((state: RootState) => state.ui);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Users, label: "Team Members", active: false },
    { icon: CheckSquare, label: "Tasks", active: false },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: Calendar, label: "Schedule", active: false },
    { icon: MessageSquare, label: "Messages", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <div
      className={`$
        mobileOverlay ? "relative" : "fixed"
      } left-0 top-0 h-full bg-dashboard-sidebar border-r border-dashboard-border transition-all duration-300 z-20 ${
        sidebarCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-dashboard-border">
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                TP
              </span>
            </div>
            <span className="text-dashboard-sidebar-foreground font-semibold text-lg">
              TeamPulse
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(toggleSidebar())}
          className="text-dashboard-sidebar-foreground hover:bg-dashboard-sidebar-hover"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <nav className="mt-6">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Button
                variant="ghost"
                className={`w-full justify-start text-dashboard-sidebar-foreground hover:bg-dashboard-sidebar-hover ${
                  item.active
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : ""
                } ${sidebarCollapsed ? "px-2" : "px-3"}`}
              >
                <item.icon
                  className={`h-5 w-5 ${sidebarCollapsed ? "" : "mr-3"}`}
                />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

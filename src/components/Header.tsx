import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { switchRole } from "../features/role/roleSlice";
import { toggleDarkMode, toggleSidebar } from "../features/ui/uiSlice";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Bell, Search, Settings, Menu } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const { currentRole, currentUser } = useSelector(
    (state: RootState) => state.role
  );
  const { darkMode, sidebarCollapsed } = useSelector(
    (state: RootState) => state.ui
  );

  const handleToggleRole = () => {
    const newRole = currentRole === "member" ? "lead" : "member";
    dispatch(switchRole(newRole));
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4 flex-1">
        {/* Search Bar */}
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search employees, tasks..."
            className="pl-10 pr-4 py-2 w-full border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
        </Button>

        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-blue-600 text-white">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              John Doe
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Administrator
            </p>
          </div>
        </div>

        <Button
          onClick={handleToggleRole}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Switch to {currentRole === "member" ? "Team Lead" : "Team Member"}
        </Button>

        <Button
          onClick={() => dispatch(toggleDarkMode())}
          variant="outline"
          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
    </header>
  );
};

export default Header;

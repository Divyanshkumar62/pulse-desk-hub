import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { fetchMembers } from "../features/members/membersSlice";
import { useInactivityReset } from "../hooks/useInactivityReset";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import MetricsCards from "../components/MetricsCards";
import ChartsSection from "../components/ChartsSection";
import RightPanel from "../components/RightPanel";
import LeadDashboard from "../components/LeadDashboard";
import MemberDashboard from "../components/MemberDashboard";
import { Switch } from "../components/ui/switch";
import { useTheme } from "../hooks/useTheme";
import { Button } from "../components/ui/button";
import { switchRole } from "../features/role/roleSlice";
// Unified mobile header: hamburger, toggle, dark mode
const MobilePrimaryHeader = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) => {
  const { darkMode, toggle } = useTheme();
  const dispatch = useDispatch();
  const currentRole = useSelector((state: RootState) => state.role.currentRole);
  // checked = true for lead, false for member
  const checked = currentRole === "lead";
  const handleToggle = (val: boolean) => {
    dispatch(switchRole(val ? "lead" : "member"));
  };
  return (
    <div className="flex items-center justify-between w-full px-2 py-2 bg-white dark:bg-gray-800 shadow border-b border-gray-200 dark:border-gray-700 lg:hidden">
      <div className="flex items-center gap-2">
        {/* Hamburger */}
        <button
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
          aria-label="Open sidebar"
          onClick={() => setSidebarOpen(true)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Toggle: switches between member and lead */}
        <Switch checked={checked} onCheckedChange={handleToggle} />
        <span className="text-xs text-gray-700 dark:text-gray-200">
          {checked ? "Lead" : "Member"}
        </span>
      </div>
      <Button
        onClick={toggle}
        variant="outline"
        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 h-8"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </Button>
    </div>
  );
};

// Top-level helper components
const HeaderProfileOnly = () => (
  <div className="flex items-center gap-2">
    <span className="inline-block w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700" />
  </div>
);

const HeaderSearchSettingsOnly = () => (
  <div className="flex items-center gap-2 w-full">
    <input
      type="text"
      placeholder="Search..."
      className="flex-1 rounded border px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    />
    <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      </svg>
    </button>
  </div>
);

// Hamburger button for mobile sidebar
const Hamburger = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) => (
  <button
    className="lg:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
    aria-label="Open sidebar"
    onClick={() => setSidebarOpen(true)}
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
);

// Mobile sidebar overlay (true overlay, sidebar slides in, no white background leak)
const MobileSidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) => {
  if (!sidebarOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity z-[101]"
        aria-hidden="true"
        onClick={() => setSidebarOpen(false)}
      />
      {/* Sidebar */}
      <aside className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg flex flex-col z-[102]">
        <button
          className="absolute top-2 right-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex-1 overflow-y-auto pt-12">
          <Sidebar mobileOverlay />
        </div>
      </aside>
    </div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentRole } = useSelector((state: RootState) => state.role);
  const { loading } = useSelector((state: RootState) => state.members);
  // const { sidebarCollapsed, darkMode } = useSelector((state: RootState) => state.ui);

  // Hamburger sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initialize inactivity reset
  useInactivityReset();

  useEffect(() => {
    if (loading === "idle") {
      dispatch(fetchMembers(8));
    }
  }, [dispatch, loading]);

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [sidebarOpen]);

  // Responsive layout for header, main, right panel
  const MainLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col min-h-[100dvh] bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Unified mobile header: hamburger, toggle, dark mode */}
      <MobilePrimaryHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {/* Second Header: Search and Settings (mobile only) */}
      <div className="flex items-center gap-2 px-2 py-2 bg-white dark:bg-gray-800 shadow border-b border-gray-200 dark:border-gray-700 w-full min-w-0 lg:hidden">
        <HeaderSearchSettingsOnly />
      </div>
      {/* Main content, sidebar, header, right panel (desktop) */}
      <div className="flex-1 flex flex-col lg:flex-row min-w-0">
        {/* Sidebar for desktop */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        {/* Main content area with header and children */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Desktop header: only search bar (Header) between sidebar and right panel */}
          <div className="hidden lg:flex flex-wrap items-center gap-2 px-2 py-2 bg-white dark:bg-gray-800 shadow w-full min-w-0">
            <div className="flex-1 min-w-0 overflow-x-auto">
              <Header />
            </div>
          </div>
          <main className="flex-1 overflow-auto p-2 sm:p-4 lg:p-6 max-w-full min-w-0">
            {children}
          </main>
        </div>
        {/* Right panel: hidden on mobile, fixed on desktop */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="fixed right-0 top-0 h-full w-80 z-10 overflow-y-auto max-h-[100dvh]">
            <RightPanel />
          </div>
        </div>
      </div>
      {/* Mobile sidebar overlay */}
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );

  // Different layouts for different roles
  if (currentRole === "lead") {
    return (
      <MainLayout>
        <MetricsCards />
        <ChartsSection />
        <LeadDashboard />
      </MainLayout>
    );
  }

  // Team Member view
  return (
    <MainLayout>
      <MetricsCards />
      <MemberDashboard />
    </MainLayout>
  );
};

export default Dashboard;

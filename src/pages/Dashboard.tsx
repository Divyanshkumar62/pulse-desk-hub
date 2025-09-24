import { useEffect } from "react";
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

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentRole } = useSelector((state: RootState) => state.role);
  const { loading } = useSelector((state: RootState) => state.members);
  const { sidebarCollapsed, darkMode } = useSelector(
    (state: RootState) => state.ui
  );

  // Initialize inactivity reset
  useInactivityReset();

  useEffect(() => {
    if (loading === "idle") {
      dispatch(fetchMembers(8));
    }
  }, [dispatch, loading]);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Different layouts for different roles
  if (currentRole === "lead") {
    return (
      <div className="flex min-h-[100dvh] bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <Sidebar />
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
            sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
          } lg:mr-80 max-w-full`}
        >
          <Header />
          <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
            {/* Team Lead sees full analytics dashboard */}
            <MetricsCards />
            <ChartsSection />
            <LeadDashboard />
          </main>
        </div>
        <div className="hidden lg:block fixed right-0 top-0 h-full w-80 z-10 overflow-y-auto max-h-[100dvh]">
          <RightPanel />
        </div>
      </div>
    );
  }

  // Team Member view - more focused on personal tasks and status
  return (
    <div className="flex min-h-[100dvh] bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Sidebar />
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        } lg:mr-80 max-w-full`}
      >
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
          {/* Team Member sees personal dashboard with some analytics */}
          <MetricsCards />
          <MemberDashboard />
        </main>
      </div>
      <div className="hidden lg:block fixed right-0 top-0 h-full w-80 z-10 overflow-y-auto max-h-[100dvh]">
        <RightPanel />
      </div>
    </div>
  );
};

export default Dashboard;

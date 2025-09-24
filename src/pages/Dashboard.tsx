import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchMembers } from '../features/members/membersSlice';
import { useInactivityReset } from '../hooks/useInactivityReset';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardContent from '../components/DashboardContent';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.members);
  const { sidebarCollapsed } = useSelector((state: RootState) => state.ui);
  
  // Initialize inactivity reset
  useInactivityReset();

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(fetchMembers(8));
    }
  }, [dispatch, loading]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <Header />
        <main className="flex-1 overflow-auto">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
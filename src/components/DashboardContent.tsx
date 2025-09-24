import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { selectAllMembers, selectMemberCountsByStatus } from '../features/members/membersSlice';
import { selectActiveTasks } from '../features/tasks/tasksSlice';
import MetricsCards from './MetricsCards';
import ChartsSection from './ChartsSection';
import MembersList from './MembersList';
import TasksList from './TasksList';
import TaskModal from './TaskModal';

const DashboardContent = () => {
  const { currentRole } = useSelector((state: RootState) => state.role);
  const members = useSelector(selectAllMembers);
  const memberCounts = useSelector(selectMemberCountsByStatus);
  const activeTasks = useSelector(selectActiveTasks);

  return (
    <div className="p-6 space-y-6">
      <MetricsCards memberCounts={memberCounts} totalTasks={activeTasks.length} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChartsSection memberCounts={memberCounts} />
          {currentRole === 'teamLead' ? <MembersList /> : <TasksList />}
        </div>
        
        <div className="space-y-6">
          {currentRole === 'teamLead' && <MembersList variant="compact" />}
        </div>
      </div>

      <TaskModal />
    </div>
  );
};

export default DashboardContent;
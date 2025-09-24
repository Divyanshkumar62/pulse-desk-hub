import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { updateStatus, MemberStatus } from '../features/members/membersSlice';
import { toggleTaskComplete } from '../features/tasks/tasksSlice';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CheckCircle, Circle, Clock } from 'lucide-react';

const MemberDashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.role);
  const tasks = useSelector((state: RootState) => state.tasks);
  const membersState = useSelector((state: RootState) => state.members.members);

  // Assume we can get current member by matching currentUser to member name, or use a fixed one
  const currentMember = membersState.find(m => m.name.includes(currentUser.split(' ')[0])) || membersState[0];

  const myTasks = tasks.filter(t => t.memberId === currentMember?.id);

  const handleStatusUpdate = (status: MemberStatus) => {
    if (currentMember) {
      dispatch(updateStatus({ memberId: currentMember.id, status }));
    }
  };

  const handleToggleComplete = (taskId: string) => {
    dispatch(toggleTaskComplete({ taskId }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Status Selector */}
      <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Status Selector</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">Update your current status</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(['Working', 'Break', 'Meeting', 'Offline'] as MemberStatus[]).map(status => (
              <Button
                key={status}
                variant={currentMember?.status === status ? "default" : "outline"}
                onClick={() => handleStatusUpdate(status)}
                className={`justify-start ${
                  currentMember?.status === status
                    ? 'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  status === 'Working' ? 'bg-green-500' :
                  status === 'Break' ? 'bg-yellow-500' :
                  status === 'Meeting' ? 'bg-blue-500' : 'bg-gray-400'
                }`}></div>
                {status}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">My Tasks</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">Your assigned tasks and progress</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-500" />
                <p>No tasks assigned yet</p>
                <p className="text-sm">Your team lead will assign tasks to you</p>
              </div>
            ) : (
              myTasks.map(task => (
                <div key={task.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleComplete(task.id)}
                          className="p-0 h-5 w-5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {task.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                          )}
                        </Button>
                        <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                          {task.title}
                        </h3>
                        <Badge variant={task.completed ? "default" : "secondary"} className={
                          task.completed
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }>
                          {task.completed ? 'Completed' : 'In Progress'}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Progress</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberDashboard;

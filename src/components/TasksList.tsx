import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { selectTasksForMember, updateTaskProgress } from '../features/tasks/tasksSlice';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, Minus, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const TasksList = () => {
  const dispatch = useDispatch();
  const { currentUserId } = useSelector((state: RootState) => state.role);
  const userTasks = useSelector(selectTasksForMember(currentUserId));

  const handleProgressChange = (taskId: string, delta: number) => {
    dispatch(updateTaskProgress({ id: taskId, delta }));
  };

  if (userTasks.length === 0) {
    return (
      <Card className="bg-card border border-dashboard-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">My Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No tasks assigned yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border border-dashboard-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">My Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userTasks.map((task) => (
            <div key={task.id} className="p-4 border border-dashboard-border rounded-lg bg-gradient-to-r from-card to-card/50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">{task.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                    </div>
                  </div>
                </div>
                <Badge variant={task.status === 'done' ? 'default' : 'secondary'}>
                  {task.status}
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleProgressChange(task.id, -10)}
                    disabled={task.progress <= 0}
                  >
                    <Minus className="h-3 w-3 mr-1" />
                    -10%
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleProgressChange(task.id, 10)}
                    disabled={task.progress >= 100}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    +10%
                  </Button>
                  {task.progress === 100 && (
                    <Badge className="bg-status-working text-white ml-2">
                      Completed!
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksList;
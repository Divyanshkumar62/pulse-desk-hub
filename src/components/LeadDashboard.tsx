import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { addTask } from '../features/tasks/tasksSlice';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Plus, MessageSquare, Filter, ArrowUpDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const LeadDashboard = () => {
  const dispatch = useDispatch();
  const members = useSelector((state: RootState) => state.members.members);
  const tasks = useSelector((state: RootState) => state.tasks);

  const [taskMemberId, setTaskMemberId] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const handleAddTask = () => {
    if (taskMemberId && taskTitle && taskDueDate) {
      dispatch(addTask({ memberId: taskMemberId, title: taskTitle, dueDate: taskDueDate }));
      setTaskMemberId('');
      setTaskTitle('');
      setTaskDueDate('');
    }
  };

  const getPendingTasks = (memberId: string) => {
    return tasks.filter(t => t.memberId === memberId && !t.completed);
  };

  const filteredMembers = statusFilter === 'all' || !statusFilter ? members : members.filter(m => m.status === statusFilter);
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    } else if (sortBy === 'tasks') {
      return getPendingTasks(b.id).length - getPendingTasks(a.id).length;
    }
    return 0;
  });

  const statusColors = {
    Working: 'bg-green-100 text-green-800',
    Break: 'bg-yellow-100 text-yellow-800',
    Meeting: 'bg-blue-100 text-blue-800',
    Offline: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="p-6 space-y-6">
      {/* Team Member Status Monitor */}
      <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Team Member Status Monitor</CardTitle>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Working">Working</SelectItem>
                  <SelectItem value="Break">Break</SelectItem>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="tasks">Tasks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedMembers.map((member) => (
              <div key={member.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} />
                      <AvatarFallback className="bg-blue-600 text-white">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{member.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Active recently</p>
                    </div>
                  </div>
                  <Badge className={statusColors[member.status]}>
                    {member.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Pending Tasks: {getPendingTasks(member.id).length}
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTaskMemberId(member.id)}
                      className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Assign
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task Assignment Form */}
      <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Task Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="member" className="text-gray-700 dark:text-gray-300">Team Member</Label>
              <Select value={taskMemberId} onValueChange={setTaskMemberId}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>
                <SelectContent>
                  {members
                    .filter(m => m.id && m.id.trim() !== '') // Filter out members with empty IDs
                    .map(m => (
                    <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">Task Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label htmlFor="dueDate" className="text-gray-700 dark:text-gray-300">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
              <Plus className="h-4 w-4 mr-2" />
              Assign Task
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadDashboard;

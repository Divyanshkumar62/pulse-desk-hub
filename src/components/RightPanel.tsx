import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Calendar, Clock, User, Phone } from 'lucide-react';

const RightPanel = () => {
  const members = useSelector((state: RootState) => state.members.members);
  const tasks = useSelector((state: RootState) => state.tasks);

  // Mock data for upcoming interviews
  const upcomingInterviews = [
    {
      id: 1,
      candidate: 'Sarah Johnson',
      position: 'Senior Developer',
      time: '10:30 AM',
      type: 'Video Call',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    {
      id: 2,
      candidate: 'Mike Chen',
      position: 'Product Manager',
      time: '2:00 PM',
      type: 'In Person',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
    },
    {
      id: 3,
      candidate: 'Emily Davis',
      position: 'UX Designer',
      time: '4:30 PM',
      type: 'Video Call',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
    }
  ];

  // Calculate some stats
  const totalApplications = 423;
  const pendingReviews = 28;
  const scheduledInterviews = upcomingInterviews.length;

  return (
    <div className="bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-6 space-y-6 overflow-y-auto h-full">
      {/* Applications Overview */}
      <Card className="border-0 shadow-sm bg-gray-50 dark:bg-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Applications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Total Applications</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalApplications}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Pending Review</span>
            <span className="text-lg font-semibold text-orange-600 dark:text-orange-400">{pendingReviews}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Interviews Scheduled</span>
            <span className="text-lg font-semibold text-green-600 dark:text-green-400">{scheduledInterviews}</span>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Interviews */}
      <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
            Upcoming Interviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingInterviews.map((interview) => (
              <div key={interview.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={interview.avatar} />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {interview.candidate.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{interview.candidate}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{interview.position}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{interview.time}</span>
                    <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                      {interview.type}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-gray-100">New application received</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-gray-100">Interview completed</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-gray-100">New task assigned</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">3 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Performance */}
      <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Team Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Tasks Completed</span>
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                {tasks.filter(t => t.completed).length}/{tasks.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Active Members</span>
              <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                {members.filter(m => m.status === 'Working').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Avg. Response Time</span>
              <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">2.4h</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightPanel;

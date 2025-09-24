import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Users, CheckSquare, Clock, TrendingUp } from 'lucide-react';

const MetricsCards = () => {
  const members = useSelector((state: RootState) => state.members.members);
  const tasks = useSelector((state: RootState) => state.tasks);

  // Calculate metrics
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'Working').length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;

  const metrics = [
    {
      title: 'Applications',
      value: '1546',
      icon: CheckSquare,
      description: 'Total submitted',
      trend: '+12.3%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Tasks',
      value: '246',
      icon: Users,
      description: 'In progress',
      trend: '+5.2%',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Employees',
      value: totalMembers.toString(),
      icon: TrendingUp,
      description: `${activeMembers} active now`,
      trend: '+2.5%',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Interviews',
      value: '101',
      icon: Clock,
      description: 'This month',
      trend: '+8.1%',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="border-0 shadow-sm bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {metric.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${metric.bgColor}`}>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{metric.value}</div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">{metric.description}</p>
              <Badge
                variant={metric.trend.startsWith('+') ? 'default' : 'secondary'}
                className={`text-xs ${
                  metric.trend.startsWith('+')
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}
              >
                {metric.trend}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards;

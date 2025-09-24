import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MemberStatus } from '../features/members/membersSlice';
import { Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface MetricsCardsProps {
  memberCounts: Record<MemberStatus, number>;
  totalTasks: number;
}

const MetricsCards = ({ memberCounts, totalTasks }: MetricsCardsProps) => {
  const totalMembers = Object.values(memberCounts).reduce((sum, count) => sum + count, 0);
  const workingMembers = memberCounts.Working || 0;
  const offlineMembers = memberCounts.Offline || 0;

  const metrics = [
    {
      title: 'Total Members',
      value: totalMembers,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Working Now',
      value: workingMembers,
      icon: CheckCircle,
      color: 'text-status-working',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Active Tasks',
      value: totalTasks,
      icon: Clock,
      color: 'text-status-meeting',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Offline',
      value: offlineMembers,
      icon: AlertTriangle,
      color: 'text-status-offline',
      bgColor: 'bg-gray-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="bg-gradient-to-br from-card to-card/80 border border-dashboard-border shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${metric.bgColor}`}>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards;
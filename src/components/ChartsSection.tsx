import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { MemberStatus } from '../features/members/membersSlice';

interface ChartsSectionProps {
  memberCounts: Record<MemberStatus, number>;
}

const ChartsSection = ({ memberCounts }: ChartsSectionProps) => {
  const pieData = Object.entries(memberCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  const statusColors = {
    Working: '#22c55e',
    Break: '#f59e0b',
    Meeting: '#3b82f6',
    Offline: '#6b7280',
  };

  // Mock timeline data for the line chart
  const timelineData = [
    { time: '9:00', active: 12 },
    { time: '10:00', active: 15 },
    { time: '11:00', active: 18 },
    { time: '12:00', active: 14 },
    { time: '13:00', active: 10 },
    { time: '14:00', active: 16 },
    { time: '15:00', active: 19 },
    { time: '16:00', active: 17 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-card border border-dashboard-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Team Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={statusColors[entry.name as MemberStatus]} 
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card border border-dashboard-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={timelineData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="active" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;
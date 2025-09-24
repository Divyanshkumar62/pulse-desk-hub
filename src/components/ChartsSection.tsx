import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ChartContainer } from "./ui/chart";
import * as RechartsPrimitive from "recharts";

const ChartsSection = () => {
  const members = useSelector((state: RootState) => state.members.members);
  const tasks = useSelector((state: RootState) => state.tasks);

  // Calculate status distribution for pie chart
  const statusCounts = members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalMembers = members.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;

  // Employee availability data for line chart
  const availabilityData = [
    { name: "Mon", value: 85 },
    { name: "Tue", value: 92 },
    { name: "Wed", value: 78 },
    { name: "Thu", value: 88 },
    { name: "Fri", value: 95 },
    { name: "Sat", value: 45 },
    { name: "Sun", value: 35 },
  ];

  // Employee availability cards data
  const availabilityCards = [
    {
      status: "Available",
      count: statusCounts.Working || 0,
      percentage: Math.round(
        ((statusCounts.Working || 0) / totalMembers) * 100
      ),
      color: "bg-green-500",
    },
    {
      status: "In Meeting",
      count: statusCounts.Meeting || 0,
      percentage: Math.round(
        ((statusCounts.Meeting || 0) / totalMembers) * 100
      ),
      color: "bg-blue-500",
    },
    {
      status: "On Break",
      count: statusCounts.Break || 0,
      percentage: Math.round(((statusCounts.Break || 0) / totalMembers) * 100),
      color: "bg-yellow-500",
    },
    {
      status: "Offline",
      count: statusCounts.Offline || 0,
      percentage: Math.round(
        ((statusCounts.Offline || 0) / totalMembers) * 100
      ),
      color: "bg-gray-400",
    },
  ];

  return (
    <div className="space-y-6 mb-6">
      {/* Employee Availability Line Chart */}
      <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Employee Availability
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Weekly availability trend
          </p>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64 mb-8">
            {/* Line Chart */}
            <ChartContainer
              config={{ value: { label: "Availability", color: "#3b82f6" } }}
            >
              <RechartsPrimitive.LineChart
                data={availabilityData}
                margin={{ top: 20, right: 30, left: 0, bottom: 32 }}
              >
                <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                <RechartsPrimitive.XAxis dataKey="name" />
                <RechartsPrimitive.YAxis
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <RechartsPrimitive.Tooltip />
                <RechartsPrimitive.Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </RechartsPrimitive.LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Employee Availability Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {availabilityCards.map((item, index) => (
          <Card
            key={index}
            className="border-0 shadow-sm bg-white dark:bg-gray-800"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {item.status}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {item.count}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.percentage}% of total
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-lg">
                    {item.count}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total Employees Pie Chart */}
      <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Total Employees
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Status distribution breakdown
          </p>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Simple pie chart representation */}
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Working - Green */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="12"
                  strokeDasharray={`${
                    ((statusCounts.Working || 0) / totalMembers) * 251.2
                  } 251.2`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
                {/* Meeting - Blue */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  strokeDasharray={`${
                    ((statusCounts.Meeting || 0) / totalMembers) * 251.2
                  } 251.2`}
                  strokeDashoffset={`${
                    (-(statusCounts.Working || 0) / totalMembers) * 251.2
                  }`}
                  transform="rotate(-90 50 50)"
                />
                {/* Break - Yellow */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="12"
                  strokeDasharray={`${
                    ((statusCounts.Break || 0) / totalMembers) * 251.2
                  } 251.2`}
                  strokeDashoffset={`${
                    (-(
                      (statusCounts.Working || 0) + (statusCounts.Meeting || 0)
                    ) /
                      totalMembers) *
                    251.2
                  }`}
                  transform="rotate(-90 50 50)"
                />
                {/* Offline - Gray */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="12"
                  strokeDasharray={`${
                    ((statusCounts.Offline || 0) / totalMembers) * 251.2
                  } 251.2`}
                  strokeDashoffset={`${
                    (-(
                      (statusCounts.Working || 0) +
                      (statusCounts.Meeting || 0) +
                      (statusCounts.Break || 0)
                    ) /
                      totalMembers) *
                    251.2
                  }`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {totalMembers}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Total
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              {Object.entries(statusCounts).map(([status, count], index) => {
                const percentage = Math.round((count / totalMembers) * 100);
                const colors = {
                  Working: "bg-green-500",
                  Break: "bg-yellow-500",
                  Meeting: "bg-blue-500",
                  Offline: "bg-gray-400",
                };

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          colors[status as keyof typeof colors] || "bg-gray-400"
                        }`}
                      ></div>
                      <span className="capitalize text-gray-700 dark:text-gray-300">
                        {status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {count}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        ({percentage}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;

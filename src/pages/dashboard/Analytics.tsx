import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState<"week" | "month" | "year">("week");

  const visitData = [
    { name: "Mon", visits: 125, clicks: 85 },
    { name: "Tue", visits: 145, clicks: 97 },
    { name: "Wed", visits: 170, clicks: 110 },
    { name: "Thu", visits: 168, clicks: 98 },
    { name: "Fri", visits: 190, clicks: 130 },
    { name: "Sat", visits: 210, clicks: 165 },
    { name: "Sun", visits: 180, clicks: 122 },
  ];

  const topLinks = [
    { name: "Twitter", value: 42 },
    { name: "Instagram", value: 28 },
    { name: "GitHub", value: 18 },
    { name: "LinkedIn", value: 12 },
  ];

  const deviceData = [
    { name: "Mobile", value: 68 },
    { name: "Desktop", value: 30 },
    { name: "Tablet", value: 2 },
  ];

  const COLORS = ["#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#6366F1"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Insights into your profile performance.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={dateRange === "week" ? "default" : "outline"}
            onClick={() => setDateRange("week")}
          >
            Week
          </Button>
          <Button
            variant={dateRange === "month" ? "default" : "outline"}
            onClick={() => setDateRange("month")}
          >
            Month
          </Button>
          <Button
            variant={dateRange === "year" ? "default" : "outline"}
            onClick={() => setDateRange("year")}
          >
            Year
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Custom
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visits vs. Clicks</CardTitle>
          <CardDescription>
            Compare profile visits to link clicks over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ChartContainer
              config={{
                visits: { color: "#8B5CF6" },
                clicks: { color: "#EC4899" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="var(--color-visits)"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="var(--color-clicks)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Links</CardTitle>
            <CardDescription>Your most clicked links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topLinks} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" scale="band" />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {topLinks.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>What devices your visitors use</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {deviceData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;

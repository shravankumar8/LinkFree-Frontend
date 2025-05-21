import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  MousePointerClick,
  Eye,
  TrendingUp,
  Plus,
  FileText,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import DashboardPagesCard from "@/components/dashboard/DashboardPagesCard";

const API_URL = import.meta.env.VITE_API_URL;

const DashboardOverview = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    {
      title: "Total Profile Views",
      value: "0",
      icon: Eye,
    },
    {
      title: "Total Link Clicks",
      value: "0",
      icon: MousePointerClick,
    },
    {
      title: "Engagement Rate",
      value: "0",
      icon: TrendingUp,
    },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/analytics/overview`, {
          withCredentials: true,
        });
        const data = response.data;
        setStats((prevStats) =>
          prevStats.map((stat) => {
            const updatedStat = data.find((item) => item.title === stat.title);
            return updatedStat ? { ...stat, value: updatedStat.value } : stat;
          })
        );
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <p className="text-muted-foreground text-sm sm:text-base">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
          Hey {"userName"} 👋, here's how your link page is doing this week!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap justify-evenly gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="overflow-hidden w-full sm:w-[200px] md:w-[220px]"
          >
            <CardHeader className="flex flex-row gap-2 items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full">
                <stat.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">
                {stat.value}
                {stat.title === "Engagement Rate" && "%"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pages Section */}
      <div className="mx-auto">
        <DashboardPagesCard />
      </div>
    </div>
  );
};

export default DashboardOverview;

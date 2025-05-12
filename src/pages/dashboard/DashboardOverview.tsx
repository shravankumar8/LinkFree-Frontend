import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Temporarily bypass ChartContainer issues for testing
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Users,
  MousePointerClick,
  Eye,
  TrendingUp,
  Plus,
  FileText,
  Lightbulb,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
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
       const response = await axios.get(
         `${API_URL}/api/analytics/overview`,
         { withCredentials: true }
       );
       const data = response.data;
       // Update state with the fetched stats from the backend
       console.log("Fetched stats:", data);
       setStats((prevStats) =>
         prevStats.map((stat) => {
           const updatedStat = data.find((item) => item.title === stat.title);
           return updatedStat ? { ...stat, value: updatedStat.value } : stat;
         })
       );
     } catch (error) {
       console.error("Failed to fetch stats:", error);
     }finally{
      setLoading(false);
     }
   };


    fetchStats();
    // Optionally, you could also listen to window load:
    // window.addEventListener("load", fetchStats);
    // return () => window.removeEventListener("load", fetchStats);
  }, []); // empty dependency array ensures this runs once on mount

  if(loading){
    return <div>
      ...loading
    </div>
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Hey {"userName"} 👋, here's how your link page is doing this week!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap justify-evenly gap-6">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="overflow-hidden "
            // style={{ borderTopColor: "var(--accent)" }}
          >
            <CardHeader className="flex flex-row gap-2 items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title + " "}
              </CardTitle>
              <div className="bg-primary/10 p-2 rounded-full">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.value}
                {stat.title === "Engagement Rate" && "%"}
              </div>

              
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pages and Weekly Visits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Your Pages */}
        <DashboardPagesCard />

    
      </div>


    
    </div>
  );
};

export default DashboardOverview;

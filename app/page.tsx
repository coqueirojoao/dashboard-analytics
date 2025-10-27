"use client";

import { Users, TrendingUp, ShoppingCart, DollarSign } from "lucide-react";
import { MetricCard, ChartCard } from "@/components/dashboard";
import { LineChart, BarChart, AreaChart, PieChart } from "@/components/charts";
import { ChartData, DashboardMetrics } from "@/types";

// Mock data - In a real app, this would come from an API
const metrics: DashboardMetrics = {
  totalUsers: 24567,
  totalRevenue: 145230,
  conversionRate: 3.24,
  averageOrderValue: 89.5,
  growth: {
    users: 12.5,
    revenue: 8.3,
    conversion: -2.1,
  },
};

const revenueData: ChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Revenue 2024",
      data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 32000, 35000, 38000, 42000, 45000],
      borderColor: "#3b82f6",
      backgroundColor: "#3b82f6",
    },
    {
      label: "Revenue 2023",
      data: [10000, 15000, 12000, 20000, 18000, 25000, 23000, 27000, 30000, 32000, 35000, 38000],
      borderColor: "#10b981",
      backgroundColor: "#10b981",
    },
  ],
};

const trafficData: ChartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Organic",
      data: [3200, 4100, 3800, 5100, 4900, 3700, 2800],
      backgroundColor: "#3b82f6",
    },
    {
      label: "Direct",
      data: [2100, 2800, 2500, 3400, 3200, 2400, 1900],
      backgroundColor: "#10b981",
    },
    {
      label: "Referral",
      data: [1500, 1900, 1700, 2300, 2100, 1600, 1200],
      backgroundColor: "#f59e0b",
    },
  ],
};

const salesByCategory: ChartData = {
  labels: ["Electronics", "Clothing", "Books", "Home & Garden", "Sports", "Toys", "Other"],
  datasets: [
    {
      label: "Sales",
      data: [35, 25, 15, 10, 8, 5, 2],
    },
  ],
};

const userGrowthData: ChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "New Users",
      data: [1200, 1900, 1500, 2500, 2200, 3000, 2800, 3200, 3500, 3800, 4200, 4500],
      borderColor: "#8b5cf6",
      backgroundColor: "#8b5cf6",
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Users"
            value={metrics.totalUsers.toLocaleString()}
            change={metrics.growth.users}
            icon={Users}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100 dark:bg-blue-900/30"
          />
          <MetricCard
            title="Total Revenue"
            value={`$${metrics.totalRevenue.toLocaleString()}`}
            change={metrics.growth.revenue}
            icon={DollarSign}
            iconColor="text-green-600"
            iconBgColor="bg-green-100 dark:bg-green-900/30"
          />
          <MetricCard
            title="Conversion Rate"
            value={`${metrics.conversionRate}%`}
            change={metrics.growth.conversion}
            icon={TrendingUp}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100 dark:bg-orange-900/30"
          />
          <MetricCard
            title="Avg. Order Value"
            value={`$${metrics.averageOrderValue}`}
            icon={ShoppingCart}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100 dark:bg-purple-900/30"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Revenue Overview" description="Monthly revenue comparison">
            <LineChart data={revenueData} height={300} />
          </ChartCard>

          <ChartCard title="Traffic Sources" description="Weekly traffic by source">
            <BarChart data={trafficData} height={300} />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Sales by Category"
            description="Distribution of sales across categories"
          >
            <PieChart data={salesByCategory} height={300} />
          </ChartCard>

          <ChartCard title="User Growth" description="New user registrations over time">
            <AreaChart data={userGrowthData} height={300} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

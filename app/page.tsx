"use client";

import { useEffect, useState } from "react";
import { Users, TrendingUp, ShoppingCart, DollarSign } from "lucide-react";
import { MetricCard, ChartCard } from "@/components/dashboard";
import { LineChart, BarChart, AreaChart, PieChart } from "@/components/charts";
import { ChartData, DashboardMetrics } from "@/types";
import {
  fetchAnalytics,
  fetchRevenueData,
  fetchTrafficData,
  fetchSalesData,
  fetchUserGrowthData,
} from "@/lib/api/dashboard";

export default function Home() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [revenueData, setRevenueData] = useState<ChartData | null>(null);
  const [trafficData, setTrafficData] = useState<ChartData | null>(null);
  const [salesData, setSalesData] = useState<ChartData | null>(null);
  const [userGrowthData, setUserGrowthData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const [metricsData, revenue, traffic, sales, userGrowth] = await Promise.all([
          fetchAnalytics(),
          fetchRevenueData(),
          fetchTrafficData(),
          fetchSalesData(),
          fetchUserGrowthData(),
        ]);

        setMetrics(metricsData);
        setRevenueData(revenue);
        setTrafficData(traffic);
        setSalesData(sales);
        setUserGrowthData(userGrowth);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!metrics || !revenueData || !trafficData || !salesData || !userGrowthData) {
    return null;
  }

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
            <PieChart data={salesData} height={300} />
          </ChartCard>

          <ChartCard title="User Growth" description="New user registrations over time">
            <AreaChart data={userGrowthData} height={300} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

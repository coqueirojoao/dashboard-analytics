"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Users, TrendingUp, ShoppingCart, DollarSign, RefreshCw, Info } from "lucide-react";
import { MetricCard, ChartCard } from "@/components/dashboard";
import { MetricCardSkeleton } from "@/components/dashboard/MetricCardSkeleton";
import { ChartCardSkeleton } from "@/components/dashboard/ChartCardSkeleton";
import { Footer } from "@/components/layout/Footer";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
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
  const t = useTranslations();
  const locale = useLocale();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [revenueData, setRevenueData] = useState<ChartData | null>(null);
  const [trafficData, setTrafficData] = useState<ChartData | null>(null);
  const [salesData, setSalesData] = useState<ChartData | null>(null);
  const [userGrowthData, setUserGrowthData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
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
      setError(t("dashboard.error"));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t("dashboard.title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{t("dashboard.subtitle")}</p>
          </div>

          {/* Metrics Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </div>

          {/* Charts Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartCardSkeleton />
            <ChartCardSkeleton />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCardSkeleton />
            <ChartCardSkeleton />
          </div>
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
            {t("dashboard.retry")}
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
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t("dashboard.title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{t("dashboard.subtitle")}</p>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Link
              href={`/${locale}/about`}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title={t("dashboard.aboutTitle")}
            >
              <Info className="w-4 h-4" />
              {t("dashboard.about")}
            </Link>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title={t("dashboard.refreshTitle")}
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? t("dashboard.refreshing") : t("dashboard.refresh")}
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title={t("metrics.totalUsers")}
            value={metrics.totalUsers.toLocaleString()}
            change={metrics.growth.users}
            icon={Users}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100 dark:bg-blue-900/30"
          />
          <MetricCard
            title={t("metrics.totalRevenue")}
            value={`$${metrics.totalRevenue.toLocaleString()}`}
            change={metrics.growth.revenue}
            icon={DollarSign}
            iconColor="text-green-600"
            iconBgColor="bg-green-100 dark:bg-green-900/30"
          />
          <MetricCard
            title={t("metrics.conversionRate")}
            value={`${metrics.conversionRate}%`}
            change={metrics.growth.conversion}
            icon={TrendingUp}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100 dark:bg-orange-900/30"
          />
          <MetricCard
            title={t("metrics.avgOrderValue")}
            value={`$${metrics.averageOrderValue}`}
            icon={ShoppingCart}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100 dark:bg-purple-900/30"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard
            title={t("charts.revenueOverview.title")}
            description={t("charts.revenueOverview.description")}
          >
            <LineChart data={revenueData} height={300} />
          </ChartCard>

          <ChartCard
            title={t("charts.trafficSources.title")}
            description={t("charts.trafficSources.description")}
          >
            <BarChart data={trafficData} height={300} />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title={t("charts.salesByCategory.title")}
            description={t("charts.salesByCategory.description")}
          >
            <PieChart data={salesData} height={300} />
          </ChartCard>

          <ChartCard
            title={t("charts.userGrowth.title")}
            description={t("charts.userGrowth.description")}
          >
            <AreaChart data={userGrowthData} height={300} />
          </ChartCard>
        </div>
      </div>

      <Footer />
    </div>
  );
}

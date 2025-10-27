import { DashboardMetrics, ChartData } from "@/types";

// Use relative URLs for API calls to work both in development and production
const API_BASE_URL =
  typeof window === "undefined" ? process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000" : "";

interface RevenueItem {
  month: string;
  year: number;
  monthName: string;
  revenue: number;
}

interface TrafficItem {
  date: string;
  dayOfWeek: string;
  organic: number;
  direct: number;
  referral: number;
}

interface SalesItem {
  category: string;
  amount: number;
  percentage: number;
}

interface UserGrowthItem {
  month: string;
  year: number;
  monthName: string;
  newUsers: number;
}

export async function fetchAnalytics(): Promise<DashboardMetrics> {
  const res = await fetch(`${API_BASE_URL}/api/analytics`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return res.json();
}

export async function fetchRevenueData(): Promise<ChartData> {
  const res = await fetch(`${API_BASE_URL}/api/revenue`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch revenue data");
  }

  const data: RevenueItem[] = await res.json();

  // Group by year
  const years = Array.from(new Set(data.map((item) => item.year)));
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const datasets = years.map((year) => {
    const yearData = data.filter((item) => item.year === year);
    const revenueByMonth = new Array(12).fill(0);

    yearData.forEach((item) => {
      const monthIndex = parseInt(item.month.split("-")[1]) - 1;
      revenueByMonth[monthIndex] = item.revenue;
    });

    return {
      label: `Revenue ${year}`,
      data: revenueByMonth,
      borderColor: year === 2024 ? "#3b82f6" : "#10b981",
      backgroundColor: year === 2024 ? "#3b82f6" : "#10b981",
    };
  });

  return { labels, datasets };
}

export async function fetchTrafficData(): Promise<ChartData> {
  const res = await fetch(`${API_BASE_URL}/api/traffic`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch traffic data");
  }

  const data: TrafficItem[] = await res.json();

  const labels = data.map((item) => item.dayOfWeek);

  return {
    labels,
    datasets: [
      {
        label: "Organic",
        data: data.map((item) => item.organic),
        backgroundColor: "#3b82f6",
      },
      {
        label: "Direct",
        data: data.map((item) => item.direct),
        backgroundColor: "#10b981",
      },
      {
        label: "Referral",
        data: data.map((item) => item.referral),
        backgroundColor: "#f59e0b",
      },
    ],
  };
}

export async function fetchSalesData(): Promise<ChartData> {
  const res = await fetch(`${API_BASE_URL}/api/sales`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sales data");
  }

  const data: SalesItem[] = await res.json();

  return {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: "Sales",
        data: data.map((item) => item.percentage),
      },
    ],
  };
}

export async function fetchUserGrowthData(): Promise<ChartData> {
  const res = await fetch(`${API_BASE_URL}/api/user-growth`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user growth data");
  }

  const data: UserGrowthItem[] = await res.json();

  return {
    labels: data.map((item) => item.monthName),
    datasets: [
      {
        label: "New Users",
        data: data.map((item) => item.newUsers),
        borderColor: "#8b5cf6",
        backgroundColor: "#8b5cf6",
      },
    ],
  };
}

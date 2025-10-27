import { AnalyticsData, DashboardMetrics } from "@/types";

export function generateMockAnalyticsData(days: number = 30): AnalyticsData[] {
  const data: AnalyticsData[] = [];
  const categories = ["Sales", "Marketing", "Support", "Development"];
  const regions = ["North", "South", "East", "West"];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));

    categories.forEach((category) => {
      data.push({
        id: `${i}-${category}`,
        date: date.toISOString().split("T")[0],
        value: Math.floor(Math.random() * 10000) + 1000,
        category,
        region: regions[Math.floor(Math.random() * regions.length)],
      });
    });
  }

  return data;
}

export function getMockDashboardMetrics(): DashboardMetrics {
  return {
    totalUsers: 12543,
    totalRevenue: 458723.45,
    conversionRate: 3.42,
    averageOrderValue: 127.89,
    growth: {
      users: 12.5,
      revenue: 8.2,
      conversion: -2.1,
    },
  };
}

export function getMockChartData(type: "daily" | "weekly" | "monthly" = "daily") {
  const labels: string[] = [];
  const data: number[] = [];

  const points = type === "daily" ? 7 : type === "weekly" ? 12 : 30;

  for (let i = 0; i < points; i++) {
    if (type === "daily") {
      const date = new Date();
      date.setDate(date.getDate() - (points - i));
      labels.push(date.toLocaleDateString("pt-BR", { weekday: "short" }));
    } else if (type === "weekly") {
      labels.push(`Week ${i + 1}`);
    } else {
      labels.push(`Day ${i + 1}`);
    }

    data.push(Math.floor(Math.random() * 5000) + 1000);
  }

  return { labels, data };
}

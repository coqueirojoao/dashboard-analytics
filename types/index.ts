// Dashboard Analytics Types

export interface AnalyticsData {
  id: string;
  date: string;
  value: number;
  category: string;
  region?: string;
}

export interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

export interface Dataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

export interface FilterOptions {
  dateRange?: {
    start: Date;
    end: Date;
  };
  categories?: string[];
  regions?: string[];
}

export interface DashboardMetrics {
  totalUsers: number;
  totalRevenue: number;
  conversionRate: number;
  averageOrderValue: number;
  growth: {
    users: number;
    revenue: number;
    conversion: number;
  };
}

export type TimeRange = "24h" | "7d" | "30d" | "90d" | "1y" | "all";

export type ChartType = "line" | "bar" | "pie" | "doughnut" | "area";

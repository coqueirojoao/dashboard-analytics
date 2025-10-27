"use client";

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartData } from "@/types";

interface AreaChartProps {
  data: ChartData;
  height?: number;
}

export function AreaChart({ data, height = 350 }: AreaChartProps) {
  // Transform data for Recharts format
  const chartData = data.labels.map((label, index) => {
    const point: Record<string, string | number> = { name: label };
    data.datasets.forEach((dataset) => {
      point[dataset.label] = dataset.data[index];
    });
    return point;
  });

  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis dataKey="name" className="text-xs fill-gray-600 dark:fill-gray-400" />
        <YAxis className="text-xs fill-gray-600 dark:fill-gray-400" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.5rem",
          }}
        />
        <Legend />
        {data.datasets.map((dataset, index) => (
          <Area
            key={dataset.label}
            type="monotone"
            dataKey={dataset.label}
            stroke={(dataset.borderColor as string) || colors[index % colors.length]}
            fill={(dataset.backgroundColor as string) || colors[index % colors.length]}
            fillOpacity={0.6}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}

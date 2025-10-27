import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { cn } from "@/lib/utils/cn";
import { formatCompactNumber, formatPercentage } from "@/lib/utils/format";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: number;
  format?: "number" | "currency" | "percentage" | "compact";
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  format = "number",
  className,
}: StatCardProps) {
  const formattedValue =
    typeof value === "number"
      ? format === "compact"
        ? formatCompactNumber(value)
        : format === "percentage"
          ? formatPercentage(value)
          : value.toLocaleString()
      : value;

  const trendColor = trend && trend > 0 ? "text-green-600" : "text-red-600";
  const trendIcon = trend && trend > 0 ? "↑" : "↓";

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{formattedValue}</div>
        {trend !== undefined && (
          <p className={cn("text-xs mt-1", trendColor)}>
            {trendIcon} {Math.abs(trend).toFixed(1)}% from last period
          </p>
        )}
      </CardContent>
    </Card>
  );
}

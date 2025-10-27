import { Schema, model, models } from "mongoose";

export interface IAnalytics {
  date: Date;
  metrics: {
    totalUsers: number;
    totalRevenue: number;
    conversionRate: number;
    averageOrderValue: number;
  };
  growth: {
    users: number;
    revenue: number;
    conversion: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const AnalyticsSchema = new Schema<IAnalytics>(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    metrics: {
      totalUsers: {
        type: Number,
        required: true,
        default: 0,
      },
      totalRevenue: {
        type: Number,
        required: true,
        default: 0,
      },
      conversionRate: {
        type: Number,
        required: true,
        default: 0,
      },
      averageOrderValue: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    growth: {
      users: {
        type: Number,
        default: 0,
      },
      revenue: {
        type: Number,
        default: 0,
      },
      conversion: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
AnalyticsSchema.index({ date: -1 });

const Analytics = models.Analytics || model<IAnalytics>("Analytics", AnalyticsSchema);

export default Analytics;

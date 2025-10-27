import { Schema, model, models } from "mongoose";

export interface IRevenue {
  month: string; // Format: YYYY-MM
  year: number;
  monthName: string; // Jan, Feb, etc.
  revenue: number;
  createdAt: Date;
  updatedAt: Date;
}

const RevenueSchema = new Schema<IRevenue>(
  {
    month: {
      type: String,
      required: true,
      unique: true,
    },
    year: {
      type: Number,
      required: true,
    },
    monthName: {
      type: String,
      required: true,
    },
    revenue: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
RevenueSchema.index({ month: -1 });
RevenueSchema.index({ year: -1 });

const Revenue = models.Revenue || model<IRevenue>("Revenue", RevenueSchema);

export default Revenue;

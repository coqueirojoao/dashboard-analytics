import { Schema, model, models } from "mongoose";

export interface ISales {
  category: string;
  amount: number;
  percentage: number;
  updatedAt: Date;
}

const SalesSchema = new Schema<ISales>(
  {
    category: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    percentage: {
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
SalesSchema.index({ category: 1 });

const Sales = models.Sales || model<ISales>("Sales", SalesSchema);

export default Sales;
